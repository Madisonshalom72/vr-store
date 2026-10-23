# DESIGN NOTES — VR Store Prototype

What this prototype is: a working, single-file-stack demo of the platform —
one shared catalog state driving a 3D storefront, a human checkout, an agent
checkout (x402 demo), and an owner back end. State persists in `localStorage`.

---

## The two ways a store comes into the world

### Path A — Virtual store with an address (prototype: BUILT)
- Owner arranges a store from platform templates (here: the "Everyday
  Essentials" market layout — 2 aisles, template shelving).
- The store receives a **virtual address**: district / street / number
  (demo: "Neon District · Circuit Ave 42") and a **shareable store URL**
  (`vrstore.example/everyday-essentials`). The address shows in the
  storefront header; the URL is how humans and agents reach the store.
- Owners may also display a **real-world address** on the storefront
  (optional field in the Path A card).
- Production additions: a district map / directory so addresses are
  discoverable, address uniqueness + claiming, more templates and in-world
  arrangement tools (drag shelves, signage, branding).

### Path B — Scan your real store (prototype: DEMO-LEVEL)
- Owner uploads photos or a video walkthrough of their actual shop.
- **What the demo does:** the uploaded photo (or a poster frame grabbed from
  the video) becomes the environment **backdrop/skin** of the 3D store; the
  same catalog products sit on the shelves in front of it. Mode chip switches
  to "SCANNED STORE · YOUR SPACE". This shows *their* space wrapped around
  the same commerce machinery — it is honestly a skin, not a reconstruction.

- **Production pipeline (the real build-out):**
  1. **Capture guidance** — in-app walkthrough coach (path, pacing, lighting,
     overlap) so the source video is reconstruction-grade.
  2. **Reconstruction** — photogrammetry (structure-from-motion + dense
     matching) or **3D Gaussian splatting** from the walkthrough video →
     navigable 3D space; mesh extraction where collision/navigation needs it.
  3. **Scale + anchoring** — owner places shelf anchors and maps catalog
     slots onto real fixtures; measurements calibrated from a known object.
  4. **Cleanup + optimization** — decimation/LOD streaming so the space runs
     smoothly in a phone browser; privacy pass (faces/plates blur).
  5. **Publish** — the reconstructed store replaces the template room; same
     catalog, inventory, orders, and agent API as Path A.

Both paths converge: catalog → shelves → cart → orders → agent API. The birth
path changes the room, never the machinery.

---

## Payments

- **Humans:** card via Stripe in production. Prototype = labeled demo
  checkout, no charge.
- **Agents:** full-amount **USDC via x402**. Prototype implements the
  handshake as a labeled demo (402 → requirements → simulated X-PAYMENT →
  facilitator verify/settle → receipt). The exact production spec is in
  `AGENT-API.md` §3.

## Store Coin (concept)

Maker wizard lives in admin as a **concept feature**. No token creation,
no chain calls. Real issuance is gated on per-business, asset- and
jurisdiction-specific **legal review** — the platform's standing
tokenization rule. Approved designs would graduate to a custodial in-store
ledger (earn/spend API), per `AGENT-API.md` §6.

## Workshops academy

Owner-area video library (`workshops/`): 6-workshop curriculum, all scripts in
`workshops/CURRICULUM.md`. Workshops #1 and #6 are produced videos; #2–#5 are
scripted slots marked "In production" in the UI. Videos use the prototype's
neutral working label only ("VR Store — Prototype").

## Prototype scope trims (honest list)

- One demo store, template room; no multi-store tenancy or auth.
- Payments are simulated end-to-end (labeled in UI).
- Scan path is a backdrop skin, not a reconstruction (see above).
- 3D is Three.js in the browser (not a headset build); drag-look + viewpoint
  gliding instead of free WASD movement, for phone-first usability.
