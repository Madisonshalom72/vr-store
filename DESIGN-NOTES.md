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

## Realism pass (2026-10-23)

Goal: close the gap to the "realistic virtual world" look — up to a true
4K canvas on capable hardware — without breaking the phone-first rule or
any commerce surface. Everything below is procedural (no new assets, no
build step); packaging is still generated **from catalog data at build
time**, so a shelf label can never disagree with the item, the browse
list, the agent JSON, or the admin table.

- **Render quality + header toggle.** Storefront header carries an
  **Auto / HD / 4K** control with a live effective-tier badge
  (persisted in `localStorage`, key `vrstore_quality_v1`). Tiers:
  LOW (pixel-ratio ≤1, 512px shadows off-loaded, no bloom),
  HD (PR ≤2, 1024px shadows, bloom), 4K (PR ≤3, 2048px shadows, bloom).
  The backing store is hard-capped at 3840×2160 in all tiers. Auto
  probes device class at load (screen size, CPU cores, memory, touch)
  and an FPS meter steps the tier down if frame rate sags — in *any*
  mode, as a safety — and back up only in Auto.
- **Color pipeline.** sRGB output + ACES filmic tone mapping;
  anisotropy on canvas textures; emissive signage excluded from tone
  mapping so brand colors stay true.
- **Lighting & materials.** Warm key light with soft PCF shadows, cool
  fill, per-aisle colored accents; PBR roughness/metalness spread
  (brushed-metal shelf frames, matte back panels, gold jar lids).
  A one-time PMREM environment capture of the room gives coherent
  reflections; env intensity is clamped per material (the bright room
  otherwise washes everything out) except the floor, which keeps a
  strong sheen. Additive neon streak decals fake the polished-floor
  bounce under each shelf run.
- **Product realism.** Each SKU gets procedural packaging drawn from its
  own catalog fields: front art (brand band, color blocks, category
  motif, name/unit, price band — gray + OUT OF STOCK when stock is 0),
  a nutrition-facts-style side panel whose barcode bars are derived from
  the SKU hash, and a printed top face. Geometry varies by category:
  boxes, crumpled bags (seeded vertex jitter), slim tubes, jars with
  metal lids, shouldered bottles with caps, trigger-spray bottles, and
  twin paper-towel rolls with printed wrap + end caps.
- **Environment.** Room shell with walls, a ceiling grid of glowing
  light panels, aisle-number floor discs, an entrance welcome-mat
  decal, and end-cap displays (stocked from the same catalog) under
  promo signs at the far end of each aisle. Fog retuned for gentle
  depth haze.
- **Bloom, guarded.** The vendored Three.js build is core-only (no
  post-processing modules), so bloom is a small custom shader chain
  (bright-pass → separable blur → additive composite). It runs only on
  HD/4K tiers, is dropped by the same FPS auto-step that guards
  resolution and shadows, and disables itself permanently if any GL
  step fails.
- **Honest ceiling.** This is *stylized* realism: crisp 4K rendering,
  real shadows and reflections, and packaging that reads as real
  product at shelf distance. **Photographic realism comes from the
  scan pipeline** — photogrammetry / Gaussian splatting of a real
  store (see the scan-path notes above), which is the production
  route for a merchant's actual shelves, products, and signage.

## Realism pass 2 (2026-10-23) — photos, themes, a fuller store

- **Photo-real product imagery.** Every seed SKU now carries a studio
  product photograph (`products/EE-*.jpg`, generated unbranded shots,
  each visually verified against its catalog entry — a jar of peanut
  butter sits under the name "Creamy Peanut Butter," never under
  anything else). The photo is the package's face in 3D — boxes,
  jars, bottles, sprays, tubes and the paper-towel wrap all draw it
  into their front panel — and it headlines the browse list and the
  product card. The catalog name, unit and price are *still typeset
  from live catalog data* around the photo, and a shelf-edge price
  tag under every slot repeats name + price from the same data, so
  no label anywhere can disagree with the item's record. Owner-added
  SKUs (no photo on file) fall back to the pass-1 procedural art.
  Canvas textures are cached per SKU + item-fields, so dense
  facings share textures instead of multiplying GPU memory.
- **A fuller store.** Shelves now carry real facings — multiples of
  each item shoulder to shoulder (2× boxes, 4× jars/bottles, 3×
  tubes) — on a price-tag rail under every board, with hanging
  aisle signs over the walkways and a checkout zone by the entrance
  (counter, register screen, an "AGENT PAY · x402" kiosk, queue
  posts, hanging CHECKOUT sign). At a glance the room reads as a
  stocked, working store, not a showroom.
- **Three store themes, one store.** A switcher in the storefront
  header (and a select in Admin → Create your store) flips the
  whole room live; the choice persists with the store's settings.
  - **Neon Tech** — the flagship: dark room, cyan→violet signage,
    neon shelf strips, polished dark tile, floor light-streaks.
  - **Everyday** — the regular store: photo grocery-tile floor,
    white shelving, daylight panels, blue/green signage, red-price
    shelf tags, brighter ambient grade (bloom off — daylight
    doesn't glow).
  - **Luxury** — the boutique: photo black-marble floor with gold
    veining, dark bronze-and-wood shelving, brass glow strips,
    gold signage, warm spotlight pools over the aisles and the
    checkout, wider visual spacing from darker backs.
  Themes change materials, the lighting rig + exposure, signage,
  decals, price-tag styling and accents — never the catalog, the
  stock logic, or any commerce surface. Photo floor textures are
  repeat-wrapped and sized for phones (1024², ~100–220 KB).
- **Performance honesty, unchanged rules.** Facings raise the mesh
  count (a few hundred product meshes), so the Auto/HD/4K FPS
  auto-step matters more, not less: on weak GPUs it still steps
  down a tier on sustained low frame rates (in headless SwiftShader
  QA it steps to LOW within seconds, exactly as designed) and the
  3840×2160 backing cap still applies in every tier and theme.
  Mid-range phones start at HD or LOW by the same device probe;
  the photo textures are 640px JPEGs (~12–52 KB per SKU).
- **Honest ceiling, restated.** Pass 2 is *photographic surfaces
  on a modeled store*: real product photos, real marble/tile
  photography, real shadows. It is still not a photograph of a
  place. **Full photographic realism — a merchant's actual room,
  fixtures and light — comes only from the scan pipeline**
  (photogrammetry / 3D Gaussian splatting, Path B above). That
  remains the production route; the themes are the template
  store's wardrobe.
