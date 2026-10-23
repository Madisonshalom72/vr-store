# Agent API — VR Store Platform (design spec)

Status: **prototype blueprint.** The in-app "Agent View" is a working demo of this
shape; this document specifies the real HTTP API the production build will expose
so that autonomous agents can buy from any store on the platform exactly the way
a human does at the shelf — same catalog, same inventory, same order pipeline.

Base URL (production): `https://api.vrstore.example/v1`
Demo store id: `everyday-essentials`

---

## 1. Read the catalog

```
GET /v1/stores/{storeId}/catalog
Accept: application/json
```

Response `200`:

```json
{
  "store": { "id": "everyday-essentials", "name": "Everyday Essentials", "currency": "USD" },
  "generatedAt": "2026-10-23T20:55:00Z",
  "items": [
    { "sku": "EE-1001", "name": "Crunch Sea Salt Chips", "price": 3.49,
      "currency": "USD", "stock": 42, "aisle": 1, "unit": "5 oz bag",
      "blurb": "Kettle-cooked potato chips with flaky sea salt." }
  ]
}
```

Rules:
- `price` is the canonical charged amount. Agents must re-read or use
  `priceAtOrder` echoed in the order response; the server always wins.
- `stock` is live. An item with `stock: 0` cannot be ordered.
- Single item: `GET /v1/stores/{storeId}/items/{sku}`.

## 2. Place an order (human and agent share this pipeline)

```
POST /v1/stores/{storeId}/orders
Content-Type: application/json
Idempotency-Key: <agent-chosen unique key>

{
  "buyerType": "agent",               // "human" | "agent"
  "buyer": { "name": "PantryBot-7", "contact": "agent@example.com" },
  "items": [ { "sku": "EE-1001", "qty": 2 }, { "sku": "EE-2008", "qty": 1 } ]
}
```

Server behavior:
1. Validate SKUs and stock atomically; reserve inventory.
2. Compute totals server-side (never trust client math).
3. If payment is required before fulfillment, respond **`402 Payment Required`**
   with x402 payment requirements (see §3). The order exists in state
   `AWAITING_PAYMENT` and the stock reservation holds for 15 minutes.
4. On settlement, the order transitions to `PAID`, then `FULFILLED`.

Response `201` (after payment settles):

```json
{
  "orderId": "VS-1007",
  "buyerType": "agent",
  "items": [ { "sku": "EE-1001", "qty": 2, "priceAtOrder": 3.49 } ],
  "total": 15.97, "currency": "USD",
  "status": "PAID",
  "payment": { "method": "x402", "asset": "USDC", "network": "base",
               "txRef": "0x…" }
}
```

Errors: `404 unknown_sku`, `409 insufficient_stock`, `402 payment_required`,
`410 reservation_expired`.

Humans use the identical endpoint from the storefront UI; their payment method
is card (Stripe, see §4) instead of x402. One pipeline keeps inventory,
pricing, and order history consistent across buyer types.

## 3. Agent payments — x402 (the real integration)

Agents pay the **full order amount** in crypto via the **x402 protocol**
(HTTP-native payments). The prototype implements this handshake as a labeled
demo — no wallets, no keys, no chain calls. Production flow:

1. **Resource request.** Agent POSTs the order (§2) without payment headers.
2. **402 + payment requirements.** Server responds `402 Payment Required` with:

```json
{
  "x402Version": 1,
  "accepts": [ {
    "scheme": "exact",
    "network": "base",
    "maxAmountRequired": "15970000",          // USDC atomic units (6 dp) = $15.97
    "resource": "/v1/stores/everyday-essentials/orders",
    "payTo": "0xMERCHANT_WALLET",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  // USDC on Base
    "maxTimeoutSeconds": 900
  } ]
}
```

3. **Payment submission.** The agent's wallet signs an EIP-3009
   `transferWithAuthorization` for the exact amount and retries the request
   with the payload in the `X-PAYMENT` header (base64-encoded signed payment).
4. **Verify + settle.** The server (or a facilitator, e.g. Coinbase's x402
   facilitator) calls `/verify` then `/settle`. On success the facilitator
   broadcasts the transfer; the server marks the order `PAID`, stores the
   transaction hash as `payment.txRef`, and returns `201` with an
   `X-PAYMENT-RESPONSE` header containing the settlement receipt.
5. **Failure paths.** Invalid signature/amount → `402` again with updated
   requirements. Expired authorization or reservation → `410`. Agents must
   treat settlement as idempotent via the `Idempotency-Key`.

Notes:
- Settlement asset is **USDC**; amounts are quoted in USD from the catalog and
  converted 1:1 to USDC atomic units.
- The merchant `payTo` address is per-store configuration, never hard-coded in
  client code; agents read it from the 402 response only.
- Gas is abstracted by the facilitator under the `exact` scheme — the agent
  pays only the order amount.

## 4. Human payments — card (Stripe)

Human checkout uses Stripe (the platform's standing card rail):
storefront creates a PaymentIntent for the order total, the client confirms
with Stripe.js, and `payment_intent.succeeded` flips the order to `PAID`.
The prototype labels this **"Demo checkout — no real charge."**

## 5. Owner back end

- `GET /v1/stores/{storeId}/orders` — all orders (human + agent, tagged).
- `PUT /v1/stores/{storeId}/items/{sku}` — price/stock/name edits; the 3D
  storefront reads the same catalog state, so edits appear on the shelf.
- `POST /v1/stores/{storeId}/items` / `DELETE …/items/{sku}` — inventory CRUD.
- Orders list must surface `buyerType`, `payment.method` (`card` | `x402`),
  total, and status — as the prototype admin does.

## 6. Store Coin (concept feature — GATED)

The admin prototype includes a **Store Coin Maker** (concept/demo only).
Real-world issuance of a store coin is **not** part of the API build until each
business passes asset- and jurisdiction-specific **legal review** (the platform's
standing tokenization rule). If and when a coin is approved for a store:

- Coin functions as (a) loyalty points and/or (b) a checkout tender type,
  selected by the owner in the maker wizard.
- Balances live in a custodial ledger per customer; earning/spending events
  are ordinary API calls (`POST /v1/stores/{id}/coin/earn|spend`).
- Agent payments in store coin would settle off-chain against the ledger;
  x402 remains the rail for USDC from external agents.

No token creation, chain calls, or wallet operations exist in the prototype.
