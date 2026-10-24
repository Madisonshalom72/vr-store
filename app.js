/* ============================================================
   VR STORE — PROTOTYPE
   One shared catalog state drives: 3D shelves · browse list ·
   agent JSON + x402 checkout · owner admin (inventory/orders).
   ============================================================ */
'use strict';

/* ---------- seed catalog (mirrors catalog.json) ---------- */
const SEED = [
 {id:1, sku:'EE-1001', name:'Crunch Sea Salt Chips', short:'CRUNCH CHIPS', price:3.49, stock:42, aisle:1, unit:'5 oz bag', color:'#e8a13a', blurb:'Kettle-cooked potato chips with flaky sea salt.'},
 {id:2, sku:'EE-1002', name:'Golden Sandwich Cookies', short:'GOLDEN COOKIES', price:4.29, stock:36, aisle:1, unit:'14 oz pack', color:'#d9b64f', blurb:'Vanilla sandwich cookies with a cream center.'},
 {id:3, sku:'EE-1003', name:'Organic Pasta 16 oz', short:'ORGANIC PASTA', price:2.19, stock:58, aisle:1, unit:'16 oz box', color:'#c96f3b', blurb:'Bronze-cut organic penne, imported semolina.'},
 {id:4, sku:'EE-1004', name:'Tomato Basil Sauce', short:'TOMATO SAUCE', price:3.79, stock:27, aisle:1, unit:'24 oz jar', color:'#b8433a', blurb:'Slow-simmered tomatoes with fresh basil.'},
 {id:5, sku:'EE-1005', name:'Whole Grain Cereal', short:'GRAIN CEREAL', price:5.49, stock:19, aisle:1, unit:'18 oz box', color:'#7d9b4e', blurb:'Toasted whole-grain flakes, lightly honeyed.'},
 {id:6, sku:'EE-1006', name:'Creamy Peanut Butter', short:'PEANUT BUTTER', price:4.99, stock:33, aisle:1, unit:'16 oz jar', color:'#a5713d', blurb:'Stone-ground peanuts, no added sugar.'},
 {id:7, sku:'EE-1007', name:'Instant Coffee 8 oz', short:'COFFEE', price:7.99, stock:14, aisle:1, unit:'8 oz jar', color:'#5b4232', blurb:'Freeze-dried medium roast, rich and smooth.'},
 {id:8, sku:'EE-1008', name:'Green Tea · 20 ct', short:'GREEN TEA', price:4.59, stock:25, aisle:1, unit:'20 bags', color:'#4e7d5a', blurb:'Whole-leaf green tea, individually wrapped.'},
 {id:9, sku:'EE-1009', name:'Sea Salt Crackers', short:'CRACKERS', price:3.29, stock:0, aisle:1, unit:'8 oz box', color:'#c2b280', blurb:'Crisp baked crackers finished with sea salt.'},
 {id:10, sku:'EE-1010', name:'Honey Oat Bars · 6 pk', short:'OAT BARS', price:5.99, stock:22, aisle:1, unit:'6 bars', color:'#d18f4a', blurb:'Chewy oat bars sweetened with real honey.'},
 {id:11, sku:'EE-1011', name:'Extra Virgin Olive Oil', short:'OLIVE OIL', price:9.49, stock:11, aisle:1, unit:'500 ml bottle', color:'#6b7d3a', blurb:'Cold-pressed, single-estate olives.'},
 {id:12, sku:'EE-1012', name:'Basmati Rice 2 lb', short:'BASMATI RICE', price:4.79, stock:4, aisle:1, unit:'2 lb bag', color:'#d8cfc0', blurb:'Long-grain aged basmati, fragrant and fluffy.'},
 {id:13, sku:'EE-2001', name:'Citrus Dish Soap', short:'DISH SOAP', price:3.99, stock:31, aisle:2, unit:'16 oz bottle', color:'#4fa8c9', blurb:'Cuts grease fast, gentle citrus scent.'},
 {id:14, sku:'EE-2002', name:'Paper Towels · 2 pk', short:'PAPER TOWELS', price:6.49, stock:18, aisle:2, unit:'2 rolls', color:'#e6e2d8', blurb:'Strong, absorbent, select-a-size sheets.'},
 {id:15, sku:'EE-2003', name:'Laundry Detergent 100 oz', short:'DETERGENT', price:12.99, stock:9, aisle:2, unit:'100 oz bottle', color:'#3f6fb8', blurb:'66 loads of deep-clean power, HE safe.'},
 {id:16, sku:'EE-2004', name:'All-Purpose Cleaner', short:'AP CLEANER', price:4.49, stock:26, aisle:2, unit:'22 oz spray', color:'#57b06a', blurb:'Plant-based spray for counters and glass.'},
 {id:17, sku:'EE-2005', name:'Hand Soap Refill', short:'HAND SOAP', price:5.29, stock:20, aisle:2, unit:'32 oz refill', color:'#c97b9a', blurb:'Foaming refill with aloe, lavender scent.'},
 {id:18, sku:'EE-2006', name:'Herbal Shampoo', short:'SHAMPOO', price:6.99, stock:16, aisle:2, unit:'12 oz bottle', color:'#7a9b3f', blurb:'Sulfate-free, with rosemary and mint.'},
 {id:19, sku:'EE-2007', name:'Mint Toothpaste', short:'TOOTHPASTE', price:3.59, stock:44, aisle:2, unit:'5.5 oz tube', color:'#4fc9b0', blurb:'Fluoride toothpaste, fresh mint.'},
 {id:20, sku:'EE-2008', name:'AA Batteries · 8 pk', short:'AA BATTERIES', price:8.99, stock:3, aisle:2, unit:'8 batteries', color:'#3a3f4a', blurb:'Long-life alkaline, 10-year shelf life.'},
 {id:21, sku:'EE-2009', name:'LED Bulbs · 4 pk', short:'LED BULBS', price:10.99, stock:13, aisle:2, unit:'4 bulbs', color:'#e8d44f', blurb:'60W-equivalent warm white, 9W draw.'},
 {id:22, sku:'EE-2010', name:'Trash Bags · 30 ct', short:'TRASH BAGS', price:7.49, stock:28, aisle:2, unit:'30 bags, 13 gal', color:'#8a8f98', blurb:'Drawstring tall-kitchen bags, leak guard.'},
 {id:23, sku:'EE-2011', name:'Vitamin D3 · 60 ct', short:'VITAMIN D3', price:11.99, stock:21, aisle:2, unit:'60 softgels', color:'#e08a3c', blurb:'5,000 IU daily softgels.'},
 {id:24, sku:'EE-2012', name:'Lip Balm · 3 pk', short:'LIP BALM', price:4.19, stock:37, aisle:2, unit:'3 sticks', color:'#b84f6e', blurb:'Beeswax balm with vitamin E.'}
];
const AISLE_NAMES = {1:'Aisle 1 · Pantry Staples', 2:'Aisle 2 · Home & Care'};

/* ---------- state ---------- */
const LS = { cat:'vrstore_catalog_v2', ord:'vrstore_orders_v2', set:'vrstore_settings_v2', coin:'vrstore_coin_v2' };
function loadLS(key, fallback){
  try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : structuredClone(fallback); }
  catch(e){ return structuredClone(fallback); }
}
function saveLS(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }

let catalog  = loadLS(LS.cat, SEED);
let orders   = loadLS(LS.ord, []);
let settings = loadLS(LS.set, {
  mode:'virtual', district:'Neon District', street:'Circuit Ave', number:42,
  realAddress:'', backdrop:null, storeName:'Everyday Essentials'
});
let coin = loadLS(LS.coin, null);
let cart = [];               // [{sku, qty}]
let orderSeq = 1001 + orders.length;
let selectedSku = null, selectedQty = 1;

/* ---------- utils ---------- */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const money = n => '$' + Number(n).toFixed(2);
const bySku = sku => catalog.find(i => i.sku === sku);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.add('hidden'), 2600);
}
function stockInfo(it){
  if (it.stock <= 0) return {cls:'out', txt:'Out of stock'};
  if (it.stock < 5)  return {cls:'low', txt:'Only ' + it.stock + ' left'};
  return {cls:'', txt:'In stock · ' + it.stock};
}

/* ---------- orders: ONE pipeline for humans + agents ---------- */
function placeOrder({buyer, buyerType, lines, payment}){
  // lines: [{sku, qty}] — validate + price from live catalog (server wins in prod)
  const items = [];
  for (const ln of lines){
    const it = bySku(ln.sku);
    if (!it) throw new Error('Unknown SKU ' + ln.sku);
    if (ln.qty < 1) throw new Error('Bad quantity');
    if (ln.qty > it.stock) throw new Error('Only ' + it.stock + ' × ' + it.name + ' in stock');
    items.push({sku: it.sku, name: it.name, qty: ln.qty, priceAtOrder: it.price});
  }
  const total = items.reduce((s,i)=> s + i.qty * i.priceAtOrder, 0);
  items.forEach(i => { bySku(i.sku).stock -= i.qty; });
  const order = {
    id: 'VS-' + (orderSeq++), buyer, buyerType, items,
    total: Math.round(total * 100) / 100, currency: 'USD',
    payment, status: 'PAID', ts: new Date().toISOString()
  };
  orders.unshift(order);
  saveLS(LS.cat, catalog); saveLS(LS.ord, orders);
  refreshAll();
  return order;
}

/* ---------- navigation ---------- */
function showView(name){
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#view-' + name).classList.add('active');
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === name));
  if (name === 'store') requestAnimationFrame(()=>{ initScene(); resizeScene(); });
  if (location.hash !== '#/' + name) history.replaceState(null, '', '#/' + name);
}
$$('.nav-btn').forEach(b => b.addEventListener('click', ()=> showView(b.dataset.nav)));

/* ---------- storefront: shelf browser ---------- */
function renderShelfList(){
  const wrap = $('#aisleList'); wrap.innerHTML = '';
  [1,2].forEach(a => {
    const items = catalog.filter(i => i.aisle === a);
    const h = document.createElement('div');
    h.className = 'aisle-title'; h.textContent = AISLE_NAMES[a] || ('Aisle ' + a);
    wrap.appendChild(h);
    const grid = document.createElement('div'); grid.className = 'prod-grid';
    items.forEach(it => {
      const si = stockInfo(it);
      const cell = document.createElement('button');
      cell.className = 'prod-cell';
      const photo = PRODUCT_PHOTOS[it.sku];
      const sw = photo
        ? '<div class="sw has-photo" style="background-color:' + it.color + ';background-image:url(' + photo + ')"></div>'
        : '<div class="sw" style="background:' + it.color + '">' + esc(it.short || it.name) + '</div>';
      cell.innerHTML =
        sw +
        '<div class="inf"><div class="nm">' + esc(it.name) + '</div>' +
        '<div class="pr"><b>' + money(it.price) + '</b><span class="stk ' + si.cls + '">' + si.txt + '</span></div></div>';
      cell.addEventListener('click', ()=>{ flyToAisle(it.aisle); openProduct(it.sku); });
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
  });
}

/* ---------- product card ---------- */
function openProduct(sku){
  const it = bySku(sku); if (!it) return;
  selectedSku = sku; selectedQty = 1;
  const si = stockInfo(it);
  const swEl = $('#pcSwatch');
  const photo = PRODUCT_PHOTOS[sku];
  if (photo){
    swEl.classList.add('has-photo');
    swEl.style.backgroundColor = it.color;
    swEl.style.backgroundImage = 'url(' + photo + ')';
    swEl.textContent = '';
  } else {
    swEl.classList.remove('has-photo');
    swEl.style.backgroundImage = 'none';
    swEl.style.backgroundColor = it.color;
    swEl.textContent = it.short || it.name;
  }
  $('#pcName').textContent = it.name;
  $('#pcSku').textContent = 'SKU ' + it.sku;
  $('#pcUnit').textContent = it.unit || '';
  $('#pcBlurb').textContent = it.blurb || '';
  $('#pcPrice').textContent = money(it.price);
  const st = $('#pcStock'); st.textContent = si.txt; st.className = 'pc-stock ' + si.cls;
  $('#pcQty').textContent = '1';
  $('#pcAdd').disabled = it.stock <= 0;
  $('#pcAdd').textContent = it.stock <= 0 ? 'Out of stock' : 'Add to cart';
  $('#productCard').classList.remove('hidden');
}
function closeProduct(){ $('#productCard').classList.add('hidden'); selectedSku = null; }
$('#pcClose').addEventListener('click', closeProduct);
$('#pcMinus').addEventListener('click', ()=>{ selectedQty = Math.max(1, selectedQty - 1); $('#pcQty').textContent = selectedQty; });
$('#pcPlus').addEventListener('click', ()=>{
  const it = bySku(selectedSku); const max = it ? Math.max(1, it.stock) : 99;
  selectedQty = Math.min(max, selectedQty + 1); $('#pcQty').textContent = selectedQty;
});
$('#pcAdd').addEventListener('click', ()=>{
  if (!selectedSku) return;
  const existing = cart.find(c => c.sku === selectedSku);
  if (existing) existing.qty += selectedQty; else cart.push({sku: selectedSku, qty: selectedQty});
  renderCart(); closeProduct(); toast('Added to cart 🧺'); openCart();
});

/* ---------- cart + human checkout ---------- */
function cartTotal(){ return cart.reduce((s,c)=>{ const it = bySku(c.sku); return s + (it ? it.price * c.qty : 0); }, 0); }
function renderCart(){
  const count = cart.reduce((s,c)=> s + c.qty, 0);
  $('#cartCount').textContent = count;
  const box = $('#cartLines');
  if (!cart.length){ box.innerHTML = '<div class="empty-note">Your cart is empty — tap a product on the shelf.</div>'; }
  else box.innerHTML = cart.map(c => {
    const it = bySku(c.sku); if (!it) return '';
    return '<div class="cart-line"><div class="cl-nm">' + esc(it.name) +
      '<small>' + money(it.price) + ' × ' + c.qty + '</small></div><b>' + money(it.price * c.qty) + '</b>' +
      '<button class="mini-btn" data-rm="' + it.sku + '">✕</button></div>';
  }).join('');
  box.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', ()=>{
    cart = cart.filter(c => c.sku !== b.dataset.rm); renderCart();
  }));
  $('#cartTotal').textContent = money(cartTotal());
  $('#checkoutBtn').disabled = !cart.length;
}
function openCart(){ $('#cartDrawer').classList.remove('hidden'); $('#cartShade').classList.remove('hidden'); }
function closeCart(){ $('#cartDrawer').classList.add('hidden'); $('#cartShade').classList.add('hidden'); }
$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartShade').addEventListener('click', closeCart);
$('#checkoutBtn').addEventListener('click', ()=>{
  if (!cart.length) return;
  $('#coTotal').textContent = money(cartTotal());
  closeCart(); $('#checkoutModal').classList.remove('hidden');
});
$('#coCancel').addEventListener('click', ()=> $('#checkoutModal').classList.add('hidden'));
$('#coPlace').addEventListener('click', ()=>{
  const name = $('#buyerName').value.trim() || 'Guest Shopper';
  try{
    const order = placeOrder({
      buyer: name, buyerType: 'human',
      lines: cart.map(c => ({sku: c.sku, qty: c.qty})),
      payment: {method: 'card', rail: 'Stripe (demo)', ref: 'DEMO-NO-CHARGE'}
    });
    cart = []; renderCart();
    $('#checkoutModal').classList.add('hidden');
    $('#confirmNum').textContent = order.id;
    $('#confirmText').textContent = 'Thanks ' + name + ' — ' + money(order.total) +
      ' demo order confirmed. It is already in the owner\'s order list, and shelf stock was updated.';
    $('#confirmModal').classList.remove('hidden');
  }catch(e){ toast('⚠️ ' + e.message); }
});
$('#confirmOk').addEventListener('click', ()=> $('#confirmModal').classList.add('hidden'));

/* refresh every surface after any state change */
function refreshAll(){
  renderShelfList(); renderCart(); renderAgent(); renderAdmin(); refreshShelves3D();
}

/* ============================================================
   3D STORE — Three.js scene
   ============================================================ */
let renderer, scene, camera, productGroup, raycaster, pointerV;
let keyLight = null, bloom = null, bloomOn = false;
let sceneReady = false;
const camGoal = { pos: new (window.THREE ? THREE.Vector3 : Object)(), look: null };
let camPosGoal = null, camLookGoal = null, camLookCur = null;
let lookOffset = {x:0, y:0};
let hovered = null;

const VIEWS = {
  entrance: {pos:[0, 1.85, 7.6],  look:[-1.0, 1.05, -2]},
  aisle1:   {pos:[-3.4, 1.62, 3.3], look:[-3.4, 1.05, -3]},
  aisle2:   {pos:[ 3.4, 1.62, 3.3], look:[ 3.4, 1.05, -3]},
  wide:     {pos:[0, 4.9, 9.2],  look:[0, 0.7, -1.5]}
};
function flyTo(name){
  const v = VIEWS[name]; if (!v || !window.THREE) return;
  camPosGoal  = new THREE.Vector3(...v.pos);
  camLookGoal = new THREE.Vector3(...v.look);
  lookOffset = {x:0, y:0};
  $$('#viewBtns .vbtn').forEach(b => b.classList.toggle('active', b.dataset.viewPt === name));
}
function flyToAisle(a){ flyTo(a === 1 ? 'aisle1' : 'aisle2'); }
$$('#viewBtns .vbtn').forEach(b => b.addEventListener('click', ()=> flyTo(b.dataset.viewPt)));

/* ============================================================
   RENDER QUALITY — Auto / HD / 4K with FPS auto-step
   Effective tiers: low (1x, no shadows/bloom) · hd (2x, 1024
   shadows, bloom) · uhd "4K" (backing store capped at 3840x2160,
   2048 shadows, bloom). Auto starts from a capability probe and
   steps down on sustained low FPS (any mode — safety), up only
   in Auto on sustained high FPS.
   ============================================================ */
const QKEY = 'vrstore_quality_v1';
let qualityMode = 'auto';
try{ const q = localStorage.getItem(QKEY); if (q && ['auto', 'hd', '4k'].includes(q)) qualityMode = q; }catch(e){}
const QTIERS = {
  low: {label:'LOW', prCap:1, shadow:512,  bloom:false},
  hd:  {label:'HD',  prCap:2, shadow:1024, bloom:true},
  uhd: {label:'4K',  prCap:3, shadow:2048, bloom:true}
};
let qTier = 'hd';
let qCooldownUntil = 0;
const fpsMeter = {frames:0, t0:0, started:0, lowStreak:0, highStreak:0};

function probeStartTier(){
  const coarse = window.matchMedia('(pointer:coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (!coarse && window.innerWidth >= 1024 && cores >= 6) return 'uhd';
  if (coarse && (cores <= 4 || mem <= 3)) return 'low';
  return 'hd';
}
function updateQualityBadge(){
  $$('.qbtn').forEach(b => b.classList.toggle('active', b.dataset.q === qualityMode));
  const eff = $('#qEff');
  if (eff) eff.textContent = QTIERS[qTier].label + (qualityMode === 'auto' ? ' · AUTO' : '');
}
function applyQuality(){
  updateQualityBadge();
  if (!renderer) return;
  const t = QTIERS[qTier];
  const wrap = $('#scene3d');
  const w = Math.max(1, wrap.clientWidth || 1), h = Math.max(1, wrap.clientHeight || 1);
  let pr = Math.min(t.prCap, window.devicePixelRatio || 1);
  pr = Math.min(pr, 3840 / w, 2160 / h);              // never exceed a 4K backing store
  if (qTier === 'low') pr = Math.min(pr, 1600 / w);
  renderer.setPixelRatio(Math.max(.5, pr));
  if (keyLight){
    keyLight.castShadow = qTier !== 'low';
    if (keyLight.shadow.mapSize.x !== t.shadow){
      keyLight.shadow.mapSize.set(t.shadow, t.shadow);
      if (keyLight.shadow.map){ keyLight.shadow.map.dispose(); keyLight.shadow.map = null; }
    }
  }
  bloomOn = !!(t.bloom && bloom && T().bloom);
  resizeScene();
}
$$('.qbtn').forEach(b => b.addEventListener('click', ()=>{
  qualityMode = b.dataset.q;
  try{ localStorage.setItem(QKEY, qualityMode); }catch(e){}
  if (qualityMode === 'hd') qTier = 'hd';
  else if (qualityMode === '4k') qTier = 'uhd';
  fpsMeter.lowStreak = 0; fpsMeter.highStreak = 0;
  qCooldownUntil = performance.now() + 4000;
  applyQuality();
  toast('Render quality: ' + qualityMode.toUpperCase() + ' · now rendering ' + QTIERS[qTier].label);
}));
function fpsTick(nowSec){
  const now = nowSec * 1000;
  if (!fpsMeter.t0){ fpsMeter.t0 = now; fpsMeter.started = now; return; }
  fpsMeter.frames++;
  const dt = (now - fpsMeter.t0) / 1000;
  if (dt < 2) return;
  const fps = fpsMeter.frames / dt;
  fpsMeter.frames = 0; fpsMeter.t0 = now;
  if (now < qCooldownUntil || now - fpsMeter.started < 5000) return;
  const order = ['low', 'hd', 'uhd'];
  const idx = order.indexOf(qTier);
  if (fps < 40){
    fpsMeter.lowStreak++; fpsMeter.highStreak = 0;
    if (fpsMeter.lowStreak >= 2 && idx > 0){
      qTier = order[idx - 1];
      fpsMeter.lowStreak = 0;
      qCooldownUntil = now + 5000;
      applyQuality();
    }
  } else if (fps > 57){
    fpsMeter.highStreak++; fpsMeter.lowStreak = 0;
    if (qualityMode === 'auto' && fpsMeter.highStreak >= 3 && idx < 2){
      qTier = order[idx + 1];
      fpsMeter.highStreak = 0;
      qCooldownUntil = now + 5000;
      applyQuality();
    }
  } else { fpsMeter.lowStreak = 0; fpsMeter.highStreak = 0; }
}
qTier = probeStartTier();
updateQualityBadge();

/* ============================================================
   STORE THEMES — Neon Tech · Everyday · Luxury
   One store, one catalog: a theme restyles the ROOM only —
   floor / walls / shelves, the lighting rig + grade, signage,
   price tags, decals and accents. Switchable live in the
   storefront header and in Owner Admin → Create your store;
   persisted in localStorage + store settings.
   ============================================================ */
const THEMES = {
  neon: {
    label:'Neon Tech', bg:0x05070f, fog:[0x05070f, 11, 26], exposure:1.02, bloom:true,
    hemiSky:0xbfe0ff, hemiGround:0x0a0c18, hemiInt:.42,
    keyColor:0xfff0da, keyInt:1.05, fillColor:0x7fa8ff, fillInt:.32,
    accents:[0x2ee6ff, 0x8b5cff], accentInt:.6, spots:false,
    floorKind:'neon', floorRough:.16, floorMetal:.6, floorEnv:1.1,
    wall:0x080d1d, ceil:0x05080f, panel:0xd9efff, bezel:0x101830,
    frame:0x1c2742, board:0x232f52, back:0x131c3a,
    header:0x0d1430, headerGlow:0x123a4d, headerGlowInt:.7, glow:0x2ee6ff,
    signBg:'#070b1a', signGrad:['#2ee6ff','#8b5cff'], signSub:'#93a4c4', signBorder:'rgba(46,230,255,.6)',
    tagBg:'#0a1128', tagInk:'#eaf6ff', tagPrice:'#2ee6ff', tagBorder:'rgba(46,230,255,.55)',
    decalBg:'rgba(8,14,30,.88)', decalInk:'#eaf6ff', decalAccent:'#2ee6ff', decalRingCss:['#2ee6ff','#8b5cff'],
    streaks:true, streakOpacity:.3, streakColors:[0x2ee6ff, 0x8b5cff]
  },
  everyday: {
    label:'Everyday', bg:0xb9c6d0, fog:[0xb9c6d0, 15, 34], exposure:1.12, bloom:false,
    hemiSky:0xffffff, hemiGround:0x9aa08c, hemiInt:.85,
    keyColor:0xfff3dc, keyInt:1.2, fillColor:0xdcebf7, fillInt:.55,
    accents:[0xffe9a8, 0xd8f3dc], accentInt:.35, spots:false,
    floorKind:'tile', floorRough:.42, floorMetal:.05, floorEnv:.35,
    wall:0xdde3e7, ceil:0xf2f4f5, panel:0xffffff, bezel:0xaeb9c0,
    frame:0xe8edef, board:0xdfe5e8, back:0xc9d3d8,
    header:0xffffff, headerGlow:0xfff2c4, headerGlowInt:.3, glow:0xffc93c,
    signBg:'#ffffff', signGrad:['#1668b4','#1f9d66'], signSub:'#54687a', signBorder:'rgba(22,104,180,.55)',
    tagBg:'#ffffff', tagInk:'#223140', tagPrice:'#d43a2f', tagBorder:'rgba(34,49,64,.3)',
    decalBg:'rgba(255,255,255,.92)', decalInk:'#223140', decalAccent:'#1668b4', decalRingCss:['#1668b4','#1f9d66'],
    streaks:false, streakOpacity:0, streakColors:[0xffffff, 0xffffff]
  },
  luxury: {
    label:'Luxury', bg:0x070605, fog:[0x070605, 10, 25], exposure:1.07, bloom:true,
    hemiSky:0xffe9c4, hemiGround:0x171208, hemiInt:.34,
    keyColor:0xffe3ae, keyInt:.95, fillColor:0x93a5cc, fillInt:.16,
    accents:[0xd9b45c, 0xd9b45c], accentInt:.5, spots:true,
    floorKind:'marble', floorRough:.12, floorMetal:.3, floorEnv:1.25,
    wall:0x161009, ceil:0x0a0705, panel:0xffe9bb, bezel:0x77602a,
    frame:0x3a2c1c, board:0x1d150e, back:0x100b07,
    header:0x120d08, headerGlow:0x59461c, headerGlowInt:.55, glow:0xd9b45c,
    signBg:'#0a0806', signGrad:['#f7dd8f','#c9930a'], signSub:'#cbb27f', signBorder:'rgba(217,180,92,.65)',
    tagBg:'#0d0a06', tagInk:'#f3e6c8', tagPrice:'#f5d67b', tagBorder:'rgba(217,180,92,.6)',
    decalBg:'rgba(12,9,6,.9)', decalInk:'#f3e6c8', decalAccent:'#d9b45c', decalRingCss:['#d9b45c','#d9b45c'],
    streaks:true, streakOpacity:.16, streakColors:[0xd9b45c, 0xd9b45c]
  }
};
const T = () => THEMES[storeTheme] || THEMES.neon;
let storeTheme = 'neon';
try{
  const savedTheme = (settings && settings.theme) || localStorage.getItem('vrstore_theme_v1');
  if (savedTheme && THEMES[savedTheme]) storeTheme = savedTheme;
}catch(e){}

/* shared themed materials + registries (signs / decals / price
   tags repaint themselves from T() whenever the theme flips) */
let TM = null;
const signMats = [];       // {mat, text, sub} — created via makeSignMat
const decalPainters = [];  // fn() — repaint a floor decal canvas
let tagPainters = [];      // fn() — repaint a price-tag canvas (rebuilt with products)
let hemiLight = null, fillLight = null, accentLights = [], spotLights = [];
let floorMeshRef = null, wallMats = [], ceilMatRef = null, panelMatRef = null, bezelMatRef = null, streakMeshes = [];
let floorTexNeon = null, floorTexTile = null, floorTexMarble = null;
function themedMats(){
  if (TM) return TM;
  const t = T();
  TM = {
    frame:  new THREE.MeshStandardMaterial({color:t.frame, metalness:.85, roughness:.32, envMapIntensity:.45}),
    board:  new THREE.MeshStandardMaterial({color:t.board, metalness:.6, roughness:.42, envMapIntensity:.45}),
    back:   new THREE.MeshStandardMaterial({color:t.back, metalness:.35, roughness:.52, envMapIntensity:.3}),
    header: new THREE.MeshStandardMaterial({color:t.header, emissive:t.headerGlow, emissiveIntensity:t.headerGlowInt, roughness:.5, metalness:.5}),
    glow:   new THREE.MeshBasicMaterial({color:t.glow})
  };
  TM.glow.toneMapped = false;
  return TM;
}
function makeSignMat(text, sub){
  const mat = new THREE.MeshBasicMaterial({map: signTexture(text, sub)});
  mat.toneMapped = false;
  signMats.push({mat, text, sub});
  return mat;
}
function imgTexture(path, rx, ry){
  const t = new THREE.TextureLoader().load(path);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  t.anisotropy = maxAniso;
  if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
  return t;
}
function applyTheme(){
  const t = T();
  if (hemiLight){ hemiLight.color.set(t.hemiSky); hemiLight.groundColor.set(t.hemiGround); hemiLight.intensity = t.hemiInt; }
  if (keyLight){ keyLight.color.set(t.keyColor); keyLight.intensity = t.keyInt; }
  if (fillLight){ fillLight.color.set(t.fillColor); fillLight.intensity = t.fillInt; }
  accentLights.forEach((p, i) => { p.color.set(t.accents[i % t.accents.length]); p.intensity = t.accentInt; });
  spotLights.forEach(s => { s.intensity = t.spots ? 1.6 : 0; });
  if (renderer) renderer.toneMappingExposure = t.exposure;
  if (scene && settings.mode !== 'scanned'){
    scene.background = new THREE.Color(t.bg);
    scene.fog = new THREE.Fog(t.fog[0], t.fog[1], t.fog[2]);
  }
  if (floorMeshRef){
    const m = floorMeshRef.material;
    m.map = t.floorKind === 'tile' ? floorTexTile : t.floorKind === 'marble' ? floorTexMarble : floorTexNeon;
    m.roughness = t.floorRough; m.metalness = t.floorMetal; m.needsUpdate = true;
  }
  wallMats.forEach(m => m.color.set(t.wall));
  if (ceilMatRef) ceilMatRef.color.set(t.ceil);
  if (panelMatRef) panelMatRef.color.set(t.panel);
  if (bezelMatRef) bezelMatRef.color.set(t.bezel);
  streakMeshes.forEach((st, i) => {
    st.visible = t.streaks;
    st.material.color.set(t.streakColors[i % t.streakColors.length]);
    st.material.opacity = t.streakOpacity;
  });
  if (TM){
    TM.frame.color.set(t.frame); TM.board.color.set(t.board); TM.back.color.set(t.back);
    TM.header.color.set(t.header); TM.header.emissive.set(t.headerGlow); TM.header.emissiveIntensity = t.headerGlowInt;
    TM.glow.color.set(t.glow);
  }
  signMats.forEach(s => { const old = s.mat.map; s.mat.map = signTexture(s.text, s.sub); if (old) old.dispose(); s.mat.needsUpdate = true; });
  decalPainters.forEach(f => f());
  tagPainters.forEach(f => f());
  bloomOn = !!(QTIERS[qTier].bloom && bloom && t.bloom);
  captureEnv();
}
function setTheme(name, quiet){
  if (!THEMES[name]) return;
  storeTheme = name;
  settings.theme = name;
  try{ localStorage.setItem('vrstore_theme_v1', name); }catch(e){}
  saveLS(LS.set, settings);
  $$('.tbtn').forEach(b => b.classList.toggle('active', b.dataset.theme === name));
  const sel = $('#vsTheme'); if (sel) sel.value = name;
  if (sceneReady) applyTheme();
  if (!quiet) toast('Store theme: ' + THEMES[name].label + ' 🏬');
}
$$('.tbtn').forEach(b => {
  b.classList.toggle('active', b.dataset.theme === storeTheme);
  b.addEventListener('click', ()=> setTheme(b.dataset.theme));
});

/* ---------- product photography — one studio photo per seed SKU.
   The photo is the package's face; the catalog name / unit / price
   are still typeset from live catalog data around it, so a shelf
   label can never disagree with the item's data. Items without a
   photo (owner-added SKUs) fall back to the procedural art. ------ */
const PRODUCT_PHOTOS = {};
SEED.forEach(it => { PRODUCT_PHOTOS[it.sku] = 'products/' + it.sku + '.jpg'; });
const photoImgs = {};
function preloadPhotos(){
  const todo = catalog.filter(it => PRODUCT_PHOTOS[it.sku] && !photoImgs[it.sku]);
  if (!todo.length) return;
  let pending = todo.length;
  const done = () => { if (--pending <= 0){ if (sceneReady) buildProducts(); renderShelfList(); } };
  todo.forEach(it => {
    const img = new Image();
    img.onload = () => { photoImgs[it.sku] = img; done(); };
    img.onerror = () => done();
    img.src = PRODUCT_PHOTOS[it.sku];
  });
}
function drawCover(g, img, dx, dy, dw, dh){
  const ir = img.naturalWidth / img.naturalHeight, r = dw / dh;
  let sw, sh, sx, sy;
  if (ir > r){ sh = img.naturalHeight; sw = sh * r; sx = (img.naturalWidth - sw) / 2; sy = 0; }
  else { sw = img.naturalWidth; sh = sw / r; sx = 0; sy = (img.naturalHeight - sh) / 2; }
  g.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/* ---------- procedural packaging — every texture is generated FROM the
   live catalog item (name / short / unit / price / stock / color), so a
   label can never disagree with the item it sits on. Deterministic per
   SKU: admin edits rebuild the art, the design otherwise stays put. --- */
let maxAniso = 4;
function skuSeed(str){ let h = 2166136261; for (let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rngFrom(seed){ let s = seed >>> 0; return function(){ s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
function shadeOf(hex, f){ const c = new THREE.Color(hex); c.multiplyScalar(f); return '#' + c.getHexString(); }
function mkCanvas(w, h){ const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function ctex(c){ const t = new THREE.CanvasTexture(c); t.anisotropy = maxAniso; if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding; return t; }
function formOf(it){
  const s = ((it.unit || '') + ' ' + (it.name || '')).toLowerCase();
  if (/tea/.test(s)) return 'box';
  if (/spray/.test(s)) return 'spray';
  if (/jar|softgel/.test(s)) return 'jar';
  if (/bottle|refill/.test(s)) return 'bottle';
  if (/rolls/.test(s)) return 'rolls';
  if (/bag/.test(s)) return 'bag';
  if (/tube/.test(s)) return 'tube';
  return 'box';
}
function initialsOf(it){
  const w = (it.short || it.name || 'EE').split(/\s+/).filter(Boolean);
  return (((w[0] || 'E')[0] || 'E') + (w[1] ? (w[1][0] || '') : ((w[0] || 'EE')[1] || ''))).toUpperCase();
}
function fitLines(g, text, maxW, maxLines){
  const words = String(text).split(/\s+/); const lines = []; let line = '';
  words.forEach(w => { const t = line ? line + ' ' + w : w; if (g.measureText(t).width > maxW && line){ lines.push(line); line = w; } else line = t; });
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}
/* front-face art, drawn into rect (x,y,w,h): brand band, badge, a
   form-specific motif, product name, unit, and the price band. */
function drawFrontArt(g, it, x, y, w, h, form){
  const out = it.stock <= 0;
  const base = out ? '#5a5f6a' : it.color;
  const grad = g.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, shadeOf(base, 1.14)); grad.addColorStop(.55, base); grad.addColorStop(1, shadeOf(base, .66));
  g.fillStyle = grad; g.fillRect(x, y, w, h);
  const gloss = g.createLinearGradient(x, y, x + w, y + h);
  gloss.addColorStop(0, 'rgba(255,255,255,.30)'); gloss.addColorStop(.35, 'rgba(255,255,255,.05)'); gloss.addColorStop(.65, 'rgba(255,255,255,0)');
  g.fillStyle = gloss; g.fillRect(x, y, w, h);
  // brand band
  g.fillStyle = 'rgba(5,10,18,.34)'; g.fillRect(x, y, w, h * .15);
  g.fillStyle = 'rgba(255,255,255,.85)'; g.font = '700 ' + Math.round(h * .052) + 'px system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText('E V E R Y D A Y   E S S E N T I A L S', x + w / 2, y + h * .104);
  // photo face: the studio product photo fills the middle of the
  // pack; name / unit / price are still typeset from catalog data
  const photo = photoImgs[it.sku];
  if (photo){
    const px = x + w * .055, py = y + h * .185, pw = w * .89, ph = h * .455;
    g.fillStyle = 'rgba(255,255,255,.94)'; g.fillRect(px - 4, py - 4, pw + 8, ph + 8);
    drawCover(g, photo, px, py, pw, ph);
    if (out){ g.fillStyle = 'rgba(88,94,106,.52)'; g.fillRect(px, py, pw, ph); }
    g.fillStyle = 'rgba(4,10,16,.92)';
    let pfs = Math.round(h * .104); g.font = '900 ' + pfs + 'px system-ui, sans-serif';
    let plines = fitLines(g, (it.short || it.name).toUpperCase(), w * .9, 2);
    if (plines.length > 1){ pfs = Math.round(pfs * .82); g.font = '900 ' + pfs + 'px system-ui, sans-serif'; plines = fitLines(g, (it.short || it.name).toUpperCase(), w * .9, 2); }
    plines.forEach((ln, i) => g.fillText(ln, x + w / 2, y + h * .715 + i * pfs * 1.14));
    g.fillStyle = 'rgba(4,10,16,.62)'; g.font = '600 ' + Math.round(h * .046) + 'px system-ui, sans-serif';
    g.fillText((it.unit || '').toUpperCase(), x + w / 2, y + h * .715 + plines.length * pfs * 1.14 + h * .055);
    g.fillStyle = 'rgba(4,10,16,.92)'; g.fillRect(x, y + h * .845, w, h * .155);
    g.fillStyle = out ? '#ff8fa3' : '#2ee6ff'; g.font = '800 ' + Math.round(h * .092) + 'px system-ui, sans-serif';
    g.fillText(out ? 'OUT OF STOCK' : '$' + Number(it.price).toFixed(2), x + w / 2, y + h * .952);
    return;
  }
  // motif (behind the badge)
  g.strokeStyle = 'rgba(255,255,255,.20)'; g.lineWidth = Math.max(2, h * .01);
  if (form === 'bag'){ for (let i = 0; i < 5; i++){ g.beginPath(); g.moveTo(x + w * (.10 + i * .18), y + h * .20); g.lineTo(x + w * (.30 + i * .18), y + h * .64); g.stroke(); } }
  else if (form === 'jar' || form === 'bottle' || form === 'spray'){ [.30, .385].forEach(u => { g.fillStyle = 'rgba(255,255,255,.16)'; g.fillRect(x + w * u, y + h * .20, w * .045, h * .46); }); }
  else if (form === 'rolls'){ [.30, .70].forEach(u => { g.beginPath(); g.arc(x + w * u, y + h * .42, h * .13, 0, Math.PI * 2); g.stroke(); }); }
  else { g.strokeStyle = 'rgba(5,10,18,.26)'; g.strokeRect(x + w * .23, y + h * .235, w * .54, h * .33); }
  // badge with initials
  const bcx = x + w / 2, bcy = y + h * .415, br = h * .15;
  g.beginPath(); g.arc(bcx, bcy, br, 0, Math.PI * 2); g.fillStyle = 'rgba(255,255,255,.93)'; g.fill();
  g.lineWidth = Math.max(3, h * .011); g.strokeStyle = 'rgba(5,10,18,.35)'; g.stroke();
  g.fillStyle = 'rgba(5,12,20,.88)'; g.font = '900 ' + Math.round(br * 1.02) + 'px system-ui, sans-serif';
  g.fillText(initialsOf(it), bcx, bcy + br * .37);
  // name + unit
  g.fillStyle = 'rgba(4,10,16,.92)';
  let fs = Math.round(h * .112); g.font = '900 ' + fs + 'px system-ui, sans-serif';
  let lines = fitLines(g, (it.short || it.name).toUpperCase(), w * .88, 2);
  if (lines.length > 1){ fs = Math.round(fs * .82); g.font = '900 ' + fs + 'px system-ui, sans-serif'; lines = fitLines(g, (it.short || it.name).toUpperCase(), w * .88, 2); }
  lines.forEach((ln, i) => g.fillText(ln, x + w / 2, y + h * .685 + i * fs * 1.14));
  g.fillStyle = 'rgba(4,10,16,.62)'; g.font = '600 ' + Math.round(h * .048) + 'px system-ui, sans-serif';
  g.fillText((it.unit || '').toUpperCase(), x + w / 2, y + h * .685 + lines.length * fs * 1.14 + h * .062);
  // price band
  g.fillStyle = 'rgba(4,10,16,.92)'; g.fillRect(x, y + h * .845, w, h * .155);
  g.fillStyle = out ? '#ff8fa3' : '#2ee6ff'; g.font = '800 ' + Math.round(h * .092) + 'px system-ui, sans-serif';
  g.fillText(out ? 'OUT OF STOCK' : '$' + Number(it.price).toFixed(2), x + w / 2, y + h * .952);
}
/* nutrition-panel-style side art with a SKU-derived barcode */
function drawSidePanel(g, it, x, y, w, h){
  const out = it.stock <= 0;
  g.fillStyle = shadeOf(out ? '#5a5f6a' : it.color, .8); g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(4,10,16,.9)'; g.textAlign = 'center';
  let fs = Math.round(h * .058); g.font = '900 ' + fs + 'px system-ui, sans-serif';
  let lines = fitLines(g, (it.short || it.name).toUpperCase(), w * .9, 2);
  if (lines.length > 1){ fs = Math.round(fs * .82); g.font = '900 ' + fs + 'px system-ui, sans-serif'; lines = fitLines(g, (it.short || it.name).toUpperCase(), w * .9, 2); }
  lines.forEach((ln, i) => g.fillText(ln, x + w / 2, y + h * .085 + i * fs * 1.2));
  const px = x + w * .09, py = y + h * .27, pw = w * .82, ph = h * .44;
  g.fillStyle = '#eceade'; g.fillRect(px, py, pw, ph);
  g.fillStyle = '#111'; g.textAlign = 'left';
  g.font = '900 ' + Math.round(ph * .115) + 'px system-ui, sans-serif';
  g.fillText('Nutrition', px + pw * .06, py + ph * .16);
  g.font = '400 ' + Math.round(ph * .115) + 'px system-ui, sans-serif';
  g.fillText('Facts', px + pw * .58, py + ph * .16);
  g.fillRect(px + pw * .05, py + ph * .21, pw * .9, ph * .05);
  const rnd = rngFrom(skuSeed(it.sku));
  for (let i = 0; i < 7; i++){
    const ry = py + ph * (.31 + i * .092);
    g.fillRect(px + pw * .05, ry, pw * (.35 + rnd() * .5), ph * .03);
    g.fillRect(px + pw * .78, ry, pw * .17, ph * .03);
  }
  g.fillRect(px + pw * .05, py + ph * .93, pw * .9, ph * .028);
  // barcode from the SKU hash — stable per item, never decorative-random
  const bx = x + w * .17, by = y + h * .78, bw = w * .66, bh = h * .12;
  g.fillStyle = '#f4f2ea'; g.fillRect(bx - 5, by - 5, bw + 10, bh + 26);
  g.fillStyle = '#111';
  let cx = bx; const rnd2 = rngFrom(skuSeed(it.sku) + 7);
  while (cx < bx + bw - 3){ const barW = 1 + Math.floor(rnd2() * 4); if (rnd2() > .35) g.fillRect(cx, by, barW, bh); cx += barW + 1 + Math.floor(rnd2() * 3); }
  g.font = '600 ' + Math.round(h * .036) + 'px ui-monospace, Menlo, monospace'; g.textAlign = 'center';
  g.fillText(it.sku, x + w / 2, by + bh + 17);
}
function frontTexture(it, form){
  const [c, g] = mkCanvas(640, 420);
  drawFrontArt(g, it, 0, 0, 640, 420, form);
  return ctex(c);
}
function sideTexture(it){
  const [c, g] = mkCanvas(340, 420);
  drawSidePanel(g, it, 0, 0, 340, 420);
  return ctex(c);
}
function topTexture(it){
  const [c, g] = mkCanvas(340, 600);
  const out = it.stock <= 0; const base = out ? '#5a5f6a' : it.color;
  g.fillStyle = shadeOf(base, .82); g.fillRect(0, 0, 340, 600);
  const gloss = g.createLinearGradient(0, 0, 340, 600);
  gloss.addColorStop(0, 'rgba(255,255,255,.22)'); gloss.addColorStop(.5, 'rgba(255,255,255,0)');
  g.fillStyle = gloss; g.fillRect(0, 0, 340, 600);
  g.beginPath(); g.arc(170, 250, 92, 0, Math.PI * 2);
  g.fillStyle = 'rgba(255,255,255,.9)'; g.fill();
  g.lineWidth = 6; g.strokeStyle = 'rgba(5,10,18,.3)'; g.stroke();
  g.fillStyle = 'rgba(5,12,20,.88)'; g.font = '900 80px system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText(initialsOf(it), 170, 280);
  g.font = '800 33px system-ui, sans-serif';
  fitLines(g, (it.short || it.name).toUpperCase(), 300, 2).forEach((ln, i) => g.fillText(ln, 170, 432 + i * 42));
  g.fillStyle = 'rgba(4,10,16,.6)'; g.font = '600 26px system-ui, sans-serif';
  g.fillText((it.unit || '').toUpperCase(), 170, 540);
  return ctex(c);
}
/* cylinder wrap: front art centered on the aisle-facing quarter.
   flip=false → front at u≈.25 (local +x, no rotation); flip=true →
   front at u≈.75 (local −x) because the group is rotated PI, which
   puts local −x toward the same world side boxes face. Nutrition
   panel sits on the back quarter, brand filler at the seam side. */
function wrapTexture(it, form, flip){
  const [c, g] = mkCanvas(1024, 512);
  const out = it.stock <= 0; const base = out ? '#5a5f6a' : it.color;
  g.fillStyle = shadeOf(base, .9); g.fillRect(0, 0, 1024, 512);
  const fx = flip ? 518 : 6;         // front art x (w 488)
  const sx = flip ? 6 : 512;         // side panel x (w 250)
  const lx = flip ? 268 : 774;       // filler x (w 250), center lx+125
  drawFrontArt(g, it, fx, 0, 488, 512, form);
  drawSidePanel(g, it, sx, 0, 250, 512);
  g.fillStyle = shadeOf(base, .6); g.fillRect(lx, 0, 250, 512);
  g.fillStyle = 'rgba(255,255,255,.30)'; g.font = '900 118px system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText(initialsOf(it), lx + 125, 246);
  g.fillStyle = 'rgba(255,255,255,.78)'; g.font = '700 29px system-ui, sans-serif';
  g.fillText((it.unit || '').toUpperCase(), lx + 125, 302);
  g.fillStyle = 'rgba(4,10,16,.85)'; g.fillRect(lx, 432, 250, 80);
  g.fillStyle = out ? '#ff8fa3' : '#2ee6ff'; g.font = '800 44px system-ui, sans-serif';
  g.fillText(out ? 'OUT' : '$' + Number(it.price).toFixed(2), lx + 125, 488);
  return ctex(c);
}
function rollWrapTexture(it){
  const [c, g] = mkCanvas(1024, 512);
  const out = it.stock <= 0; const base = out ? '#5a5f6a' : it.color;
  g.fillStyle = '#f0eee6'; g.fillRect(0, 0, 1024, 512);
  const photo = photoImgs[it.sku];
  if (photo){
    drawCover(g, photo, 0, 92, 1024, 252);
    if (out){ g.fillStyle = 'rgba(88,94,106,.5)'; g.fillRect(0, 92, 1024, 252); }
    g.fillStyle = 'rgba(4,10,16,.55)'; g.font = '700 24px system-ui, sans-serif'; g.textAlign = 'center';
    g.fillText('E V E R Y D A Y   E S S E N T I A L S', 512, 66);
    g.fillStyle = 'rgba(4,10,16,.92)'; g.font = '900 66px system-ui, sans-serif';
    fitLines(g, (it.short || it.name).toUpperCase(), 940, 1).forEach(ln => g.fillText(ln, 512, 428));
    g.fillStyle = 'rgba(4,10,16,.78)'; g.font = '700 36px system-ui, sans-serif';
    g.fillText((it.unit || '').toUpperCase() + '  ·  $' + Number(it.price).toFixed(2), 512, 478);
    if (out){ g.fillStyle = '#ff8fa3'; g.font = '900 54px system-ui, sans-serif'; g.fillText('OUT OF STOCK', 512, 236); }
    return ctex(c);
  }
  g.fillStyle = base; g.fillRect(0, 120, 1024, 158);
  g.fillStyle = 'rgba(4,10,16,.92)'; g.font = '900 72px system-ui, sans-serif'; g.textAlign = 'center';
  fitLines(g, (it.short || it.name).toUpperCase(), 940, 1).forEach(ln => g.fillText(ln, 512, 226));
  g.fillStyle = shadeOf(base, .8); g.fillRect(0, 326, 1024, 40);
  g.fillStyle = 'rgba(4,10,16,.78)'; g.font = '700 36px system-ui, sans-serif';
  g.fillText((it.unit || '').toUpperCase() + '  ·  $' + Number(it.price).toFixed(2), 512, 448);
  g.fillStyle = 'rgba(4,10,16,.55)'; g.font = '700 24px system-ui, sans-serif';
  g.fillText('E V E R Y D A Y   E S S E N T I A L S', 512, 66);
  if (out){ g.fillStyle = 'rgba(20,20,26,.5)'; g.fillRect(0, 0, 1024, 512); g.fillStyle = '#ff8fa3'; g.font = '900 62px system-ui, sans-serif'; g.fillText('OUT OF STOCK', 512, 92); }
  return ctex(c);
}
function rollCapTexture(){
  const [c, g] = mkCanvas(256, 256);
  g.fillStyle = '#e9e6da'; g.fillRect(0, 0, 256, 256);
  g.beginPath(); g.arc(128, 128, 98, 0, Math.PI * 2); g.strokeStyle = '#c9c4b2'; g.lineWidth = 10; g.stroke();
  g.beginPath(); g.arc(128, 128, 62, 0, Math.PI * 2); g.strokeStyle = '#d5d0bf'; g.lineWidth = 6; g.stroke();
  g.beginPath(); g.arc(128, 128, 38, 0, Math.PI * 2); g.fillStyle = '#b9b2a0'; g.fill();
  g.beginPath(); g.arc(128, 128, 24, 0, Math.PI * 2); g.fillStyle = '#8f887a'; g.fill();
  return ctex(c);
}
function signTexture(text, sub){
  const t = T();
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = t.signBg; g.fillRect(0,0,1024,256);
  const grad = g.createLinearGradient(0,0,1024,0);
  grad.addColorStop(0, t.signGrad[0]); grad.addColorStop(1, t.signGrad[1]);
  g.fillStyle = grad; g.font = '900 92px system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText(text, 512, 118);
  g.fillStyle = t.signSub; g.font = '600 44px system-ui, sans-serif';
  g.fillText(sub || '', 512, 196);
  g.strokeStyle = t.signBorder; g.lineWidth = 6; g.strokeRect(8,8,1008,240);
  return ctex(c);
}
function rrPath(g, x, y, w, h, r){
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
function floorTexture(){
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#0a0e1e'; g.fillRect(0,0,256,256);
  g.fillStyle = '#0d1226'; g.fillRect(2,2,252,252);
  g.strokeStyle = 'rgba(46,230,255,.20)'; g.lineWidth = 2; g.strokeRect(1,1,254,254);
  const tex = ctex(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(10, 14);
  return tex;
}

function buildShelfUnit(x, facing /* +1 faces +x, -1 faces -x */){
  const unit = new THREE.Group();
  const M = themedMats();
  const frameMat = M.frame, boardMat = M.board, glowMat = M.glow;
  // uprights
  [-2.3, 2.3].forEach(z => {
    const up = new THREE.Mesh(new THREE.BoxGeometry(.12, 2.4, .12), frameMat);
    up.position.set(0, 1.2, z); up.castShadow = true; unit.add(up);
  });
  // back panel
  const back = new THREE.Mesh(new THREE.BoxGeometry(.06, 2.4, 4.8), M.back);
  back.position.set(-facing * .34, 1.2, 0); back.receiveShadow = true; unit.add(back);
  // shelf boards + glow strips + price-tag rail at 3 levels
  [0.42, 1.12, 1.82].forEach(y => {
    const board = new THREE.Mesh(new THREE.BoxGeometry(.78, .06, 4.8), boardMat);
    board.position.set(0, y, 0); board.receiveShadow = true; board.castShadow = true; unit.add(board);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(.8, .025, 4.8), glowMat);
    strip.position.set(0, y - .055, 0); unit.add(strip);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.05, .05, 4.8), frameMat);
    rail.position.set(facing * .40, y - .01, 0); unit.add(rail);
  });
  const header = new THREE.Mesh(new THREE.BoxGeometry(.5, .34, 4.8), M.header);
  header.position.set(0, 2.32, 0); unit.add(header);
  unit.position.x = x;
  if (facing < 0) unit.rotation.y = Math.PI;
  return unit;
}

/* texture cache — shelf facings share one canvas texture per SKU,
   so a denser shelf doesn't multiply GPU memory. The key carries
   every field the art is drawn from, so editing an item re-keys
   its art and the shelf redraws itself. */
const texCache = new Map();
const cachedTexSet = new Set();
function texKey(it, kind){
  return kind + '|' + it.sku + '|' + it.name + '|' + it.short + '|' + it.unit + '|' +
    it.price + '|' + (it.stock <= 0) + '|' + it.color + '|' + (photoImgs[it.sku] ? 'ph' : 'np');
}
function cachedTex(key, maker){
  if (!texCache.has(key)){ const t = maker(); texCache.set(key, t); cachedTexSet.add(t); }
  return texCache.get(key);
}
let rollCapTexShared = null;

/* one product as a small group of meshes, silhouette by category.
   Origin at the product's base; front art faces local +x (or local −x
   for rotated placement — see wrapTexture flip). */
function buildProductGroup(it, facing){
  const out = it.stock <= 0;
  const base = out ? '#5a5f6a' : it.color;
  const form = formOf(it);
  const grp = new THREE.Group();
  const add = m => { m.castShadow = true; m.receiveShadow = true; grp.add(m); return m; };
  if (form === 'jar' || form === 'bottle' || form === 'spray'){
    const wrap = cachedTex(texKey(it, 'wrap' + (facing < 0 ? 'f' : 'n')), () => wrapTexture(it, form, facing < 0));
    const wrapMat = new THREE.MeshStandardMaterial({map: wrap, roughness:.3, metalness:.06, envMapIntensity:.45,
      emissive: 0x666666, emissiveMap: wrap, emissiveIntensity: out ? .22 : .42});
    const plainMat = new THREE.MeshStandardMaterial({color: new THREE.Color(shadeOf(base, .8)), roughness:.48, metalness:.18, envMapIntensity:.35});
    const darkMat = new THREE.MeshStandardMaterial({color: 0x232833, roughness:.42, metalness:.55, envMapIntensity:.5});
    if (form === 'jar'){
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(.20, .20, .5, 26), [wrapMat, plainMat, plainMat]));
      body.position.y = .25;
      const lid = add(new THREE.Mesh(new THREE.CylinderGeometry(.208, .208, .07, 26),
        new THREE.MeshStandardMaterial({color: 0xd9b45c, roughness:.3, metalness:.85, envMapIntensity:.85})));
      lid.position.y = .535;
    } else if (form === 'bottle'){
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(.16, .185, .38, 24), [wrapMat, plainMat, plainMat]));
      body.position.y = .19;
      const shoulder = add(new THREE.Mesh(new THREE.CylinderGeometry(.055, .16, .1, 24), plainMat));
      shoulder.position.y = .43;
      const neck = add(new THREE.Mesh(new THREE.CylinderGeometry(.055, .055, .06, 16), plainMat));
      neck.position.y = .51;
      const cap = add(new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .07, 16), darkMat));
      cap.position.y = .565;
    } else { /* spray */
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(.155, .165, .44, 24), [wrapMat, plainMat, plainMat]));
      body.position.y = .22;
      const head = add(new THREE.Mesh(new THREE.BoxGeometry(.13, .1, .13), darkMat));
      head.position.y = .49;
      const nozzle = add(new THREE.Mesh(new THREE.BoxGeometry(.1, .05, .24), darkMat));
      nozzle.position.set(0, .53, .06);
    }
  } else if (form === 'rolls'){
    const wrap = cachedTex(texKey(it, 'roll'), () => rollWrapTexture(it));
    const cap = rollCapTexShared || (rollCapTexShared = rollCapTexture());
    const wm = new THREE.MeshStandardMaterial({map: wrap, roughness:.62, metalness:0, envMapIntensity:.3,
      emissive: 0x555555, emissiveMap: wrap, emissiveIntensity: out ? .18 : .32});
    const cm = new THREE.MeshStandardMaterial({map: cap, roughness:.72, metalness:0, envMapIntensity:.25});
    [-0.17, 0.17].forEach(dz => {
      const roll = add(new THREE.Mesh(new THREE.CylinderGeometry(.145, .145, .56, 22), [wm, cm, cm]));
      roll.position.set(0, .28, dz);
    });
  } else { /* box family: box / bag (jittered) / tube (slim) */
    const front = cachedTex(texKey(it, 'front'), () => frontTexture(it, form));
    const frontMat = new THREE.MeshStandardMaterial({map: front, roughness:.46, metalness:.06, envMapIntensity:.4,
      emissive: 0x777777, emissiveMap: front, emissiveIntensity: out ? .28 : .52});
    const sideMatT = new THREE.MeshStandardMaterial({map: cachedTex(texKey(it, 'side'), () => sideTexture(it)), roughness:.55, metalness:.05, envMapIntensity:.3});
    const topMat = new THREE.MeshStandardMaterial({map: cachedTex(texKey(it, 'top'), () => topTexture(it)), roughness:.55, metalness:.05, envMapIntensity:.3});
    const plainMat = new THREE.MeshStandardMaterial({color: new THREE.Color(shadeOf(base, .6)), roughness:.6, metalness:.1, envMapIntensity:.3});
    const dims = form === 'tube' ? [.42, .5, .68] : [.54, .62, .92];
    const seg = form === 'bag' ? 3 : 1;
    const geo = new THREE.BoxGeometry(dims[0], dims[1], dims[2], seg, seg, seg);
    if (form === 'bag'){
      // crumple: jitter shared vertices (seeded by SKU) so bags look soft-packed
      const pos = geo.attributes.position; const rnd = rngFrom(skuSeed(it.sku)); const seen = {};
      for (let i = 0; i < pos.count; i++){
        const key = pos.getX(i).toFixed(3) + ',' + pos.getY(i).toFixed(3) + ',' + pos.getZ(i).toFixed(3);
        if (!seen[key]) seen[key] = [(rnd() - .5) * .032, (rnd() - .5) * .032, (rnd() - .5) * .032];
        const d = seen[key];
        pos.setXYZ(i, pos.getX(i) + d[0], pos.getY(i) + d[1], pos.getZ(i) + d[2]);
      }
      geo.computeVertexNormals();
    }
    const mats = [plainMat, plainMat, topMat, plainMat, sideMatT, sideMatT];
    const m = add(new THREE.Mesh(geo, mats));
    m.position.y = dims[1] / 2;
    grp.userData.boxMats = {mats, frontMat};   // buildProducts assigns front by facing
  }
  return grp;
}

/* shelf-edge price tag for one slot — name + price typeset from
   live catalog data onto the shelf rail, repainted on theme flips.
   In this layout every product front faces world +x (pass-1
   convention for both shelf facings), so tags mount on the +x
   rail, facing +x, directly under the fronts they name. */
function priceTagMesh(it){
  const [c, g] = mkCanvas(256, 56);
  const tex = ctex(c);
  const paint = () => {
    const t = T();
    g.clearRect(0, 0, 256, 56);
    g.fillStyle = t.tagBg; g.fillRect(0, 0, 256, 56);
    g.strokeStyle = t.tagBorder; g.lineWidth = 3; g.strokeRect(2, 2, 252, 52);
    g.textAlign = 'left'; g.fillStyle = t.tagInk;
    g.font = '700 20px system-ui, sans-serif';
    g.fillText((it.short || it.name).toUpperCase(), 11, 36, 148);
    g.textAlign = 'right'; g.fillStyle = it.stock <= 0 ? '#ff5d7a' : t.tagPrice;
    g.font = '900 25px system-ui, sans-serif';
    g.fillText(it.stock <= 0 ? 'OUT' : '$' + Number(it.price).toFixed(2), 245, 38);
    tex.needsUpdate = true;
  };
  paint();
  tagPainters.push(paint);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(.66, .145),
    new THREE.MeshBasicMaterial({map: tex}));
  mesh.rotation.y = Math.PI / 2;
  return mesh;
}

function buildProducts(){
  if (productGroup) {
    productGroup.traverse(o => {
      if (o.isMesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
          if (m.map && !cachedTexSet.has(m.map)) m.map.dispose();
          if (m.emissiveMap && m.emissiveMap !== m.map && !cachedTexSet.has(m.emissiveMap)) m.emissiveMap.dispose();
          m.dispose();
        });
      }
    });
    scene.remove(productGroup);
  }
  tagPainters = [];
  productGroup = new THREE.Group();
  const levels = [0.42, 1.12, 1.82];
  const place = (grp, it, x, y, z, rotY) => {
    if (grp.userData.boxMats) grp.userData.boxMats.mats[rotY === Math.PI ? 1 : 0] = grp.userData.boxMats.frontMat;
    grp.position.set(x, y, z);
    grp.rotation.y = rotY;
    grp.userData.sku = it.sku; grp.userData.baseY = y; grp.userData.pulse = 0;
    productGroup.add(grp);
  };
  [1, 2].forEach(a => {
    const items = catalog.filter(i => i.aisle === a);
    const ax = a === 1 ? -3.4 : 3.4;
    items.forEach((it, idx) => {
      const side = idx < 6 ? -1 : 1;                 // left unit / right unit
      const j = idx % 6;
      const level = levels[Math.floor(j / 2)];
      const z = (j % 2 === 0 ? -1.15 : 1.15);
      const x = ax + side * 1.55;
      const facing = side < 0 ? 1 : -1;              // face the aisle walkway
      // dense facings: a real shelf carries multiples of each item,
      // shoulder to shoulder along the slot — count by footprint
      const form = formOf(it);
      const FORM_Z = {box:.92, bag:.92, tube:.68, jar:.40, bottle:.38, spray:.34, rolls:.64};
      const FACINGS = {box:2, bag:2, tube:3, jar:4, bottle:4, spray:4, rolls:2};
      const n = FACINGS[form] || 2;
      const step = (FORM_Z[form] || .6) + .06;
      for (let k = 0; k < n; k++){
        const zk = z + (k - (n - 1) / 2) * step;
        place(buildProductGroup(it, facing), it, x, level + .03, zk, facing < 0 ? Math.PI : 0);
      }
      // shelf-edge price tag under the slot, on the +x rail
      const tag = priceTagMesh(it);
      tag.position.set(x + .45, level - .01, z);
      productGroup.add(tag);
    });
    // end-cap display at the far end of the aisle: first 3 items, mini,
    // fronts turned toward the entrance so shoppers meet them head-on
    items.slice(0, 3).forEach((it, k) => {
      const mini = buildProductGroup(it);
      if (mini.userData.boxMats) mini.userData.boxMats.mats[0] = mini.userData.boxMats.frontMat;
      mini.scale.setScalar(.82);
      mini.position.set(ax + (k - 1) * .58, .8, -3.08);
      mini.rotation.y = -Math.PI / 2;
      mini.userData.sku = it.sku; mini.userData.baseY = .8; mini.userData.pulse = 0; mini.userData.baseScale = .82;
      productGroup.add(mini);
    });
  });
  scene.add(productGroup);
}
function refreshShelves3D(){ if (sceneReady) buildProducts(); }

function initScene(){
  if (sceneReady || !window.THREE) { if (!window.THREE) $('#sceneFallback').classList.remove('hidden'); return; }
  const wrap = $('#scene3d');
  try{
    renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
  }catch(e){ $('#sceneFallback').classList.remove('hidden'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
  if (THREE.ACESFilmicToneMapping){ renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.02; }
  maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 4);
  wrap.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070f, 11, 26);
  applyBackdrop();
  camera = new THREE.PerspectiveCamera(58, 1, .1, 100);
  camera.position.set(...VIEWS.entrance.pos);
  camLookCur = new THREE.Vector3(...VIEWS.entrance.look);
  flyTo('entrance');

  // lights — the theme's rig: hemisphere wash, warm key with soft
  // shadows, cool fill, colored aisle accents, plus spotlights
  // that only the Luxury theme switches on (pools of light).
  // (Quality tiers steer shadow size + on/off.)
  const t0 = T();
  hemiLight = new THREE.HemisphereLight(t0.hemiSky, t0.hemiGround, t0.hemiInt);
  scene.add(hemiLight);
  keyLight = new THREE.DirectionalLight(t0.keyColor, t0.keyInt);
  keyLight.position.set(5, 8.5, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -10; keyLight.shadow.camera.right = 10;
  keyLight.shadow.camera.top = 10; keyLight.shadow.camera.bottom = -10;
  keyLight.shadow.camera.near = 1; keyLight.shadow.camera.far = 28;
  keyLight.shadow.bias = -0.0004; keyLight.shadow.normalBias = .02;
  scene.add(keyLight);
  fillLight = new THREE.DirectionalLight(t0.fillColor, t0.fillInt);
  fillLight.position.set(-6, 4.5, -4); scene.add(fillLight);
  accentLights = [];
  [[-3.4], [3.4]].forEach(([x], i) => {
    const p = new THREE.PointLight(t0.accents[i % t0.accents.length], t0.accentInt, 11);
    p.position.set(x, 2.9, 0); scene.add(p); accentLights.push(p);
  });
  spotLights = [];
  [[-3.4, 0], [3.4, 0], [5.9, 5.2]].forEach(([x, z]) => {
    const s = new THREE.SpotLight(0xffd9a0, 0, 11, .58, .9, 1);
    s.position.set(x, 3.5, z);
    s.target.position.set(x, 0, z);
    scene.add(s); scene.add(s.target);
    spotLights.push(s);
  });

  // floor — one mesh, three skins: procedural neon tile, photo
  // grocery tile (Everyday), photo black marble (Luxury). The
  // theme sets roughness/metalness so each reads true.
  floorTexNeon = floorTexture();
  floorTexTile = imgTexture('textures/floor-tile.jpg', 6, 8);
  floorTexMarble = imgTexture('textures/floor-marble.jpg', 5, 7);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 22),
    new THREE.MeshStandardMaterial({map: floorTexNeon, roughness:.16, metalness:.6, envMapIntensity:1.1}));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; floor.name = 'floorMesh';
  floorMeshRef = floor;
  scene.add(floor);

  // fake neon floor reflections: additive gradient streaks under the
  // shelf glow lines (cheap, reads as polished-floor bounce)
  const streakTex = (()=>{ const [c, g] = mkCanvas(128, 256);
    const gr = g.createLinearGradient(0, 0, 128, 0);
    gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.5, 'rgba(255,255,255,.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 256); return ctex(c); })();
  streakMeshes = [];
  [[-4.95, 0x2ee6ff], [-1.85, 0x2ee6ff], [1.85, 0x8b5cff], [4.95, 0x8b5cff]].forEach(([x, col]) => {
    const st = new THREE.Mesh(new THREE.PlaneGeometry(.55, 4.8),
      new THREE.MeshBasicMaterial({map: streakTex, color: col, transparent: true, opacity: .3, blending: THREE.AdditiveBlending, depthWrite: false}));
    st.material.toneMapped = false;
    st.rotation.x = -Math.PI / 2; st.position.set(x, .006, 0); st.renderOrder = 1; scene.add(st);
    streakMeshes.push(st);
  });

  // floor decals: entrance welcome mat + aisle number discs.
  // Painters close over their canvas so a theme flip repaints them.
  function makeDecalMesh(pw, ph, cw, ch, draw, opacity){
    const [c, g] = mkCanvas(cw, ch);
    const tex = ctex(c);
    const paint = () => { g.clearRect(0, 0, cw, ch); draw(g, cw, ch, T()); tex.needsUpdate = true; };
    paint(); decalPainters.push(paint);
    const mat = new THREE.MeshBasicMaterial({map: tex, transparent: true, depthWrite: false, opacity: opacity == null ? 1 : opacity});
    mat.toneMapped = false;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), mat);
    mesh.rotation.x = -Math.PI / 2; mesh.renderOrder = 2;
    return mesh;
  }
  const matDecal = makeDecalMesh(4.8, 1.2, 1024, 256, (g, w, h, t) => {
    rrPath(g, 10, 10, w - 20, h - 20, 30); g.fillStyle = t.decalBg; g.fill();
    g.lineWidth = 4; g.strokeStyle = t.decalAccent; g.stroke();
    g.fillStyle = t.decalInk; g.font = '900 62px system-ui, sans-serif'; g.textAlign = 'center';
    g.fillText('EVERYDAY ESSENTIALS', w / 2, h / 2 - 2);
    g.fillStyle = t.decalAccent; g.font = '700 33px system-ui, sans-serif';
    g.fillText('HUMANS + AGENTS WELCOME', w / 2, h / 2 + 52);
  }, .96);
  matDecal.position.set(0, .012, 5.6); scene.add(matDecal);
  [1, 2].forEach(a => {
    const disc = makeDecalMesh(1.15, 1.15, 256, 256, (g, w, h, t) => {
      g.beginPath(); g.arc(128, 128, 112, 0, Math.PI * 2); g.fillStyle = t.decalBg; g.fill();
      g.lineWidth = 8; g.strokeStyle = t.decalRingCss[a - 1]; g.stroke();
      g.fillStyle = t.decalInk; g.font = '900 128px system-ui, sans-serif'; g.textAlign = 'center';
      g.fillText(String(a), 128, 172);
    });
    disc.position.set(a === 1 ? -3.4 : 3.4, .012, 3.9); scene.add(disc);
  });

  // room shell: back + side walls so light has somewhere to land
  const wallMat = new THREE.MeshStandardMaterial({color:T().wall, roughness:.85, metalness:.1});
  wallMats = [wallMat];
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(17, 3.8), wallMat);
  backWall.position.set(0, 1.9, -7.9); backWall.receiveShadow = true; scene.add(backWall);
  [-8.3, 8.3].forEach(x => {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(22, 3.8), wallMat);
    wall.position.set(x, 1.9, 0); wall.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    wall.receiveShadow = true; scene.add(wall);
  });
  // ceiling with glowing light panels over the aisles
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(17, 22),
    new THREE.MeshStandardMaterial({color:T().ceil, roughness:.95, metalness:.1}));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = 3.62; scene.add(ceil);
  ceilMatRef = ceil.material;
  const panelMat = new THREE.MeshBasicMaterial({color:T().panel}); panelMat.toneMapped = false;
  panelMatRef = panelMat;
  const bezelMat = new THREE.MeshStandardMaterial({color:T().bezel, roughness:.6, metalness:.4});
  bezelMatRef = bezelMat;
  [-3.4, 0, 3.4].forEach(x => [-5.2, -1.2, 2.8].forEach(z => {
    const bez = new THREE.Mesh(new THREE.BoxGeometry(1.2, .05, 3.0), bezelMat);
    bez.position.set(x, 3.6, z); scene.add(bez);
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.8), panelMat);
    p.rotation.x = Math.PI / 2; p.position.set(x, 3.57, z); scene.add(p);
  }));

  // end-cap display bases at the far end of each aisle (minis land in
  // buildProducts; bases + promo signs live here as static dressing)
  const capFrameMat = themedMats().frame;
  [1, 2].forEach(a => {
    const ax = a === 1 ? -3.4 : 3.4;
    const baseM = new THREE.Mesh(new THREE.BoxGeometry(1.9, .8, .85), capFrameMat);
    baseM.position.set(ax, .4, -3.08); baseM.castShadow = true; baseM.receiveShadow = true; scene.add(baseM);
    [-.85, .85].forEach(dx => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(.06, .62, .06), capFrameMat);
      post.position.set(ax + dx, 1.11, -3.14); scene.add(post);
    });
    const capSign = new THREE.Mesh(new THREE.PlaneGeometry(2.0, .5),
      makeSignMat(a === 1 ? 'PANTRY PICKS' : 'HOME ESSENTIALS', 'END CAP · FRESH DEALS'));
    capSign.position.set(ax, 1.68, -3.11); scene.add(capSign);
  });

  // shelf units + aisle signs
  [1, 2].forEach(a => {
    const ax = a === 1 ? -3.4 : 3.4;
    scene.add(buildShelfUnit(ax - 1.55, 1));
    scene.add(buildShelfUnit(ax + 1.55, -1));
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, .9),
      makeSignMat(a === 1 ? 'AISLE 1' : 'AISLE 2', a === 1 ? 'PANTRY STAPLES' : 'HOME & CARE'));
    sign.position.set(ax, 3.0, -3.4); scene.add(sign);
    // hanging aisle sign over the walkway — two faces back to back
    // on rods, the way real stores hang them
    const hangMat = makeSignMat(a === 1 ? 'AISLE 1' : 'AISLE 2', a === 1 ? 'PANTRY STAPLES' : 'HOME & CARE');
    const hang1 = new THREE.Mesh(new THREE.PlaneGeometry(2.7, .68), hangMat);
    hang1.position.set(ax, 2.84, .9); scene.add(hang1);
    const hang2 = hang1.clone(); hang2.rotation.y = Math.PI; scene.add(hang2);
    [-1.1, 1.1].forEach(dx => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(.014, .014, .46, 8), capFrameMat);
      rod.position.set(ax + dx, 3.4, .9); scene.add(rod);
    });
  });
  // entrance hero sign
  const hero = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.6),
    makeSignMat('EVERYDAY ESSENTIALS', 'OPEN TO HUMANS + AGENTS'));
  hero.position.set(0, 3.3, -7.2); scene.add(hero);

  // checkout zone — counter + register screen + an agent-pay
  // kiosk by the entrance, so the room reads as a working store
  const ck = new THREE.Group();
  const ckBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, .85), themedMats().board);
  ckBody.position.y = .5; ckBody.castShadow = true; ckBody.receiveShadow = true; ck.add(ckBody);
  const ckTop = new THREE.Mesh(new THREE.BoxGeometry(2.6, .07, 1.0), themedMats().frame);
  ckTop.position.y = 1.03; ckTop.castShadow = true; ck.add(ckTop);
  const regBase = new THREE.Mesh(new THREE.BoxGeometry(.4, .16, .34), themedMats().frame);
  regBase.position.set(-.6, 1.14, -.18); ck.add(regBase);
  const regScreen = new THREE.Mesh(new THREE.PlaneGeometry(.92, .23),
    makeSignMat('CHECKOUT', 'CARD · CASH · AGENT PAY'));
  regScreen.position.set(-.6, 1.38, -.2); regScreen.rotation.x = -.28; ck.add(regScreen);
  const kioskPost = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.18, .12), themedMats().frame);
  kioskPost.position.set(.85, .59, .1); ck.add(kioskPost);
  const kioskScreen = new THREE.Mesh(new THREE.PlaneGeometry(.84, .21),
    makeSignMat('AGENT PAY', 'x402 · USDC · INSTANT'));
  kioskScreen.position.set(.85, 1.32, .08); kioskScreen.rotation.x = -.3; ck.add(kioskScreen);
  [-.95, .95].forEach(dx => {
    const bol = new THREE.Mesh(new THREE.CylinderGeometry(.05, .06, .92, 12), themedMats().frame);
    bol.position.set(dx, .46, 1.35); bol.castShadow = true; ck.add(bol);
  });
  const ckSignMat = makeSignMat('CHECKOUT', 'SELF + ASSISTED');
  const ckSign1 = new THREE.Mesh(new THREE.PlaneGeometry(2.3, .58), ckSignMat);
  ckSign1.position.set(0, 2.62, 0); ck.add(ckSign1);
  const ckSign2 = ckSign1.clone(); ckSign2.rotation.y = Math.PI; ck.add(ckSign2);
  [-1.0, 1.0].forEach(dx => {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(.014, .014, .66, 8), themedMats().frame);
    rod.position.set(dx, 3.26, 0); ck.add(rod);
  });
  ck.position.set(5.9, 0, 5.6);
  ck.rotation.y = -.42;
  scene.add(ck);

  buildProducts();
  initBloom();
  applyTheme();
  preloadPhotos();

  raycaster = new THREE.Raycaster(); pointerV = new THREE.Vector2();
  const el = renderer.domElement;
  let downAt = null, dragging = false, lastX = 0, lastY = 0;
  el.addEventListener('pointerdown', e => { downAt = {x:e.clientX, y:e.clientY, t:Date.now()}; dragging = false; lastX = e.clientX; lastY = e.clientY; });
  el.addEventListener('pointermove', e => {
    if (downAt){
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.abs(e.clientX - downAt.x) + Math.abs(e.clientY - downAt.y) > 7) dragging = true;
      if (dragging){
        lookOffset.x = THREE.MathUtils.clamp(lookOffset.x - dx * .012, -2.4, 2.4);
        lookOffset.y = THREE.MathUtils.clamp(lookOffset.y + dy * .008, -.7, .7);
      }
      lastX = e.clientX; lastY = e.clientY;
    } else if (window.matchMedia('(pointer:fine)').matches){
      pointerV.x = (e.offsetX / el.clientWidth) * 2 - 1;
      pointerV.y = -(e.offsetY / el.clientHeight) * 2 + 1;
      const mesh = pickProduct();
      if (hovered && hovered !== mesh) hovered.scale.setScalar(hovered.userData.baseScale || 1);
      hovered = mesh;
      if (hovered) hovered.scale.setScalar((hovered.userData.baseScale || 1) * 1.07);
      el.style.cursor = hovered ? 'pointer' : 'grab';
    }
  });
  el.addEventListener('pointerup', e => {
    const wasTap = downAt && !dragging && (Date.now() - downAt.t) < 450;
    downAt = null;
    if (!wasTap) return;
    pointerV.x = (e.offsetX / el.clientWidth) * 2 - 1;
    pointerV.y = -(e.offsetY / el.clientHeight) * 2 + 1;
    const hit = pickProduct();
    if (hit){ hit.userData.pulse = 1; openProduct(hit.userData.sku); }
  });

  window.addEventListener('resize', resizeScene);
  resizeScene();
  applyQuality();
  sceneReady = true;

  const clock = new THREE.Clock();
  (function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (camPosGoal) camera.position.lerp(camPosGoal, .05);
    if (camLookGoal && camLookCur){
      const goal = camLookGoal.clone(); goal.x += lookOffset.x; goal.y += lookOffset.y;
      camLookCur.lerp(goal, .07); camera.lookAt(camLookCur);
    }
    if (productGroup) productGroup.children.forEach(m => {
      if (m.userData.pulse > 0){
        m.userData.pulse = Math.max(0, m.userData.pulse - .045);
        const s = 1 + Math.sin(m.userData.pulse * Math.PI) * .13;
        if (m !== hovered) m.scale.setScalar((m.userData.baseScale || 1) * s);
        m.position.y = m.userData.baseY + Math.sin(m.userData.pulse * Math.PI) * .06;
      }
    });
    fpsTick(t);
    if (bloomOn && bloom) renderBloom();
    else renderer.render(scene, camera);
  })();
}
function resizeScene(){
  if (!renderer) return;
  const wrap = $('#scene3d');
  const w = wrap.clientWidth, h = wrap.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  sizeBloom();
}
/* pick the product group under the pointer (recursive: products are
   groups of meshes now, so walk up to the ancestor carrying a SKU) */
function pickProduct(){
  if (!productGroup || !camera || !raycaster) return null;
  raycaster.setFromCamera(pointerV, camera);
  const hits = raycaster.intersectObjects(productGroup.children, true);
  for (const h of hits){
    let o = h.object;
    while (o && !(o.userData && o.userData.sku)) o = o.parent;
    if (o) return o;
  }
  return null;
}
/* environment reflections: PMREM from the room itself, one-time, so
   standard materials pick up coherent sheen (floor, metal, jars) */
function captureEnv(){
  if (!renderer || !scene || !THREE.PMREMGenerator) return;
  try{
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(scene, .04);
    scene.environment = envRT.texture;
    pmrem.dispose();
    // the room is bright (ceiling panels + signs), so unclamped env
    // washes standard materials out — keep reflections subtle on
    // everything except the polished floor, which earns its sheen
    scene.traverse(o => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
        if (m && 'envMapIntensity' in m) m.envMapIntensity = (o.name === 'floorMesh') ? T().floorEnv : .28;
      });
    });
  }catch(e){ /* env reflections are a garnish, never a blocker */ }
}
/* ---------- lightweight bloom (custom, guarded) ----------
   scene → RT · bright-pass → 2x separable blur at half res ·
   additive composite. Enabled only on HD/4K tiers while frame
   rate holds; any failure disables it permanently. */
function makeQuad(frag, uniforms){
  const mat = new THREE.ShaderMaterial({
    uniforms, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: frag
  });
  const sc = new THREE.Scene();
  sc.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
  return {scene: sc, mat};
}
function initBloom(){
  if (bloom) return;
  try{
    bloom = {
      cam: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
      sceneRT: null, brightRT: null, blurA: null, blurB: null,
      copy: makeQuad('uniform sampler2D tD; varying vec2 vUv; void main(){ gl_FragColor = texture2D(tD, vUv); }', {tD: {value: null}}),
      bright: makeQuad('uniform sampler2D tD; varying vec2 vUv; void main(){ vec4 c = texture2D(tD, vUv); float l = dot(c.rgb, vec3(.299, .587, .114)); float k = smoothstep(.5, .95, l); gl_FragColor = vec4(c.rgb * k, 1.0); }', {tD: {value: null}}),
      blur: makeQuad('uniform sampler2D tD; uniform vec2 dir; varying vec2 vUv; void main(){ vec4 s = texture2D(tD, vUv) * .227; vec2 o1 = dir * 1.384; vec2 o2 = dir * 3.23; s += texture2D(tD, vUv + o1) * .316; s += texture2D(tD, vUv - o1) * .316; s += texture2D(tD, vUv + o2) * .070; s += texture2D(tD, vUv - o2) * .070; gl_FragColor = s; }', {tD: {value: null}, dir: {value: new THREE.Vector2(1, 0)}}),
      add: makeQuad('uniform sampler2D tD; uniform float str; varying vec2 vUv; void main(){ gl_FragColor = texture2D(tD, vUv) * str; }', {tD: {value: null}, str: {value: .55}})
    };
    bloom.add.mat.blending = THREE.AdditiveBlending;
    bloom.add.mat.transparent = true;
    sizeBloom();
    bloomOn = !!(QTIERS[qTier].bloom && bloom);
  }catch(e){ bloom = null; bloomOn = false; }
}
function sizeBloom(){
  if (!bloom || !renderer) return;
  const s = new THREE.Vector2();
  renderer.getDrawingBufferSize(s);
  const bw = Math.max(2, Math.floor(s.x / 2)), bh = Math.max(2, Math.floor(s.y / 2));
  [['sceneRT', s.x, s.y, true], ['brightRT', bw, bh, false], ['blurA', bw, bh, false], ['blurB', bw, bh, false]].forEach(([k, w, h, depth]) => {
    if (bloom[k]) bloom[k].dispose();
    bloom[k] = new THREE.WebGLRenderTarget(w, h, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: depth});
  });
  if (THREE.sRGBEncoding) bloom.sceneRT.texture.encoding = THREE.sRGBEncoding;
}
function renderBloom(){
  const r = renderer, b = bloom;
  r.setRenderTarget(b.sceneRT); r.render(scene, camera);
  b.bright.mat.uniforms.tD.value = b.sceneRT.texture;
  r.setRenderTarget(b.brightRT); r.render(b.bright.scene, b.cam);
  let src = b.brightRT;
  for (let i = 0; i < 2; i++){
    const dstA = i === 0 ? b.blurA : b.blurB, dstB = i === 0 ? b.blurB : b.blurA;
    b.blur.mat.uniforms.tD.value = src.texture;
    b.blur.mat.uniforms.dir.value.set(1 / b.blurA.width, 0);
    r.setRenderTarget(dstA); r.render(b.blur.scene, b.cam);
    b.blur.mat.uniforms.tD.value = dstA.texture;
    b.blur.mat.uniforms.dir.value.set(0, 1 / b.blurA.height);
    r.setRenderTarget(dstB); r.render(b.blur.scene, b.cam);
    src = dstB;
  }
  r.setRenderTarget(null);
  b.copy.mat.uniforms.tD.value = b.sceneRT.texture;
  r.render(b.copy.scene, b.cam);
  b.add.mat.uniforms.tD.value = src.texture;
  r.autoClear = false; r.render(b.add.scene, b.cam); r.autoClear = true;
}
function applyBackdrop(){
  if (!scene) return;
  if (settings.mode === 'scanned' && settings.backdrop){
    new THREE.TextureLoader().load(settings.backdrop, tex => { scene.background = tex; scene.fog = null; });
    $('#hudModeChip').textContent = 'SCANNED STORE · YOUR SPACE';
  } else {
    scene.background = new THREE.Color(T().bg);
    scene.fog = new THREE.Fog(T().fog[0], T().fog[1], T().fog[2]);
    $('#hudModeChip').textContent = 'VIRTUAL STORE';
  }
}

/* ============================================================
   AGENT VIEW — catalog JSON + x402 demo checkout
   ============================================================ */
let pendingAgentOrder = null; // {buyer, lines, total}

function catalogJSON(){
  return {
    store: {id:'everyday-essentials', name: settings.storeName, currency:'USD',
            address: storeAddressLine(), url: storeURL()},
    generatedAt: new Date().toISOString(),
    items: catalog.map(i => ({sku:i.sku, name:i.name, price:i.price, currency:'USD',
      stock:i.stock, aisle:i.aisle, unit:i.unit, blurb:i.blurb}))
  };
}
function renderAgent(){
  const pre = $('#agentJson'); if (!pre) return;
  pre.textContent = JSON.stringify(catalogJSON(), null, 2);
  const sel = $('#agSku');
  const cur = sel.value;
  sel.innerHTML = catalog.map(i =>
    '<option value="' + i.sku + '"' + (i.stock <= 0 ? ' disabled' : '') + '>' +
    i.sku + ' — ' + esc(i.name) + ' (' + money(i.price) + ', ' + i.stock + ' in stock)</option>').join('');
  if (cur && bySku(cur)) sel.value = cur;
  updateAgentTotal();
}
function updateAgentTotal(){
  const it = bySku($('#agSku').value);
  const qty = Math.max(1, parseInt($('#agQty').value || '1', 10));
  $('#agTotal').textContent = it ? money(it.price * qty) : '$0.00';
}
$('#agSku').addEventListener('change', updateAgentTotal);
$('#agQty').addEventListener('input', updateAgentTotal);
$('#copyJsonBtn').addEventListener('click', async ()=>{
  try{ await navigator.clipboard.writeText(JSON.stringify(catalogJSON(), null, 2)); toast('Catalog JSON copied 📋'); }
  catch(e){ toast('Copy blocked by browser — JSON is selectable in the box'); }
});
$('#dlJsonBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(catalogJSON(), null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'catalog.json'; a.click();
  setTimeout(()=> URL.revokeObjectURL(a.href), 2000);
});
$('#refreshJsonBtn').addEventListener('click', ()=>{ renderAgent(); toast('Catalog refreshed ↻'); });

$('#agRequestBtn').addEventListener('click', ()=>{
  const it = bySku($('#agSku').value);
  const qty = Math.max(1, parseInt($('#agQty').value || '1', 10));
  const buyer = $('#agName').value.trim() || 'Unnamed Agent';
  if (!it) return toast('Pick an item first');
  if (qty > it.stock) return toast('⚠️ Only ' + it.stock + ' in stock');
  const total = Math.round(it.price * qty * 100) / 100;
  pendingAgentOrder = {buyer, lines:[{sku: it.sku, qty}], total};
  // x402 step 1: 402 + payment requirements (demo values, placeholder payTo)
  $('#x402req').textContent = JSON.stringify({
    x402Version: 1, error: 'Payment required (DEMO — no real charge)',
    accepts: [{
      scheme: 'exact', network: 'base',
      maxAmountRequired: String(Math.round(total * 1e6)),
      asset: 'USDC (0x8335…2913 on Base)',
      payTo: '0xDEMO_PLACEHOLDER_MERCHANT_WALLET',
      resource: '/v1/stores/everyday-essentials/orders',
      maxTimeoutSeconds: 900
    }],
    orderPreview: {buyer, buyerType: 'agent', items: pendingAgentOrder.lines, totalUSD: total}
  }, null, 2);
  $('#x402box').classList.remove('hidden');
  $('#xStep1').classList.remove('hidden');
  $('#xStep2').classList.add('hidden');
  $('#xStep3').classList.add('hidden');
  $('#x402box').scrollIntoView({behavior:'smooth', block:'nearest'});
});
$('#agPayBtn').addEventListener('click', ()=>{
  if (!pendingAgentOrder) return;
  $('#xStep1').classList.add('hidden');
  $('#xStep2').classList.remove('hidden');
  const fill = $('#settleFill'); fill.style.width = '0%';
  requestAnimationFrame(()=> requestAnimationFrame(()=>{ fill.style.width = '100%'; }));
  setTimeout(()=>{
    try{
      const txRef = '0xDEMO' + Math.random().toString(16).slice(2, 10).toUpperCase() + '…PLACEHOLDER';
      const order = placeOrder({
        buyer: pendingAgentOrder.buyer, buyerType: 'agent', lines: pendingAgentOrder.lines,
        payment: {method: 'x402', asset: 'USDC', network: 'base', ref: txRef}
      });
      $('#xStep2').classList.add('hidden');
      $('#xStep3').classList.remove('hidden');
      $('#x402receipt').textContent = JSON.stringify({
        orderId: order.id, status: 'PAID', total: order.total, currency: 'USD',
        payment: {method:'x402', asset:'USDC', network:'base', txRef, settledVia:'facilitator (simulated)'},
        note: 'DEMO settlement — no real funds moved.'
      }, null, 2);
      pendingAgentOrder = null;
      toast('Agent order ' + order.id + ' settled via x402 🤖💸');
    }catch(e){
      $('#xStep2').classList.add('hidden');
      $('#xStep1').classList.remove('hidden');
      toast('⚠️ ' + e.message);
    }
  }, 1600);
});
$('#agAgainBtn').addEventListener('click', ()=>{
  $('#x402box').classList.add('hidden'); renderAgent();
});

/* ============================================================
   ADMIN — store identity + creation paths
   ============================================================ */
function storeAddressLine(){
  return settings.district + ' · ' + settings.street + ' ' + settings.number;
}
function storeURL(){
  return 'vrstore.example/' + settings.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
function renderStoreHeader(){
  $('#storeNameHdr').textContent = settings.storeName;
  let addr = '📍 ' + storeAddressLine() + ' · ' + storeURL();
  if (settings.realAddress) addr += ' · 🏠 ' + settings.realAddress;
  $('#storeAddrHdr').textContent = addr;
  $('#hudStoreChip').textContent = settings.storeName.toUpperCase();
}
$('#vsApplyBtn').addEventListener('click', ()=>{
  settings.mode = 'virtual';
  settings.district = $('#vsDistrict').value;
  settings.street = $('#vsStreet').value.trim() || 'Circuit Ave';
  settings.number = parseInt($('#vsNumber').value || '42', 10);
  settings.realAddress = $('#vsRealAddr').value.trim();
  settings.backdrop = null;
  saveLS(LS.set, settings);
  setTheme($('#vsTheme').value, true);
  renderStoreHeader(); applyBackdrop();
  $('#vsResult').innerHTML = '✅ Virtual address assigned: <b>' + esc(storeAddressLine()) +
    '</b><br>Shareable store URL: <b>' + esc(storeURL()) + '</b>' +
    (settings.realAddress ? '<br>Real-world address shown on storefront: ' + esc(settings.realAddress) : '');
  toast('Virtual address assigned 🌐');
});
let scanDataURL = null, scanIsVideo = false;
$('#scanFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  scanIsVideo = f.type.startsWith('video');
  const url = URL.createObjectURL(f);
  const pv = $('#scanPreview'); pv.classList.remove('hidden');
  pv.innerHTML = scanIsVideo
    ? '<video src="' + url + '" controls muted playsinline></video>'
    : '<img src="' + url + '" alt="Your store scan">';
  if (!scanIsVideo){
    const img = new Image();
    img.onload = ()=>{
      const c = document.createElement('canvas');
      const scale = Math.min(1, 1280 / img.width);
      c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      scanDataURL = c.toDataURL('image/jpeg', .82);
      $('#scanApplyBtn').disabled = false;
    };
    img.src = url;
  } else {
    // demo: grab a poster frame from the video for the backdrop
    const v = pv.querySelector('video');
    v.addEventListener('loadeddata', ()=>{
      v.currentTime = Math.min(1, (v.duration || 2) / 2);
    });
    v.addEventListener('seeked', ()=>{
      const c = document.createElement('canvas');
      c.width = v.videoWidth; c.height = v.videoHeight;
      c.getContext('2d').drawImage(v, 0, 0);
      scanDataURL = c.toDataURL('image/jpeg', .82);
      $('#scanApplyBtn').disabled = false;
    }, {once:true});
  }
});
$('#scanApplyBtn').addEventListener('click', ()=>{
  if (!scanDataURL) return;
  settings.mode = 'scanned'; settings.backdrop = scanDataURL;
  saveLS(LS.set, settings);
  applyBackdrop();
  $('#scanResult').innerHTML = '✅ Your space is now the store backdrop. Production build: the full walkthrough ' +
    'is reconstructed into a navigable 3D space (photogrammetry / Gaussian splatting) — see DESIGN-NOTES.md.';
  toast('Store backdrop applied 📸');
  showView('store');
});

/* ============================================================
   ADMIN — inventory CRUD
   ============================================================ */
function renderInventory(){
  const tb = $('#invTable tbody'); tb.innerHTML = '';
  catalog.forEach(it => {
    const tr = document.createElement('tr');
    const flag = it.stock <= 0 ? '<span class="outflag">OUT</span>'
               : it.stock < 5 ? '<span class="lowflag">LOW</span>' : '';
    tr.innerHTML = '<td><b>' + esc(it.name) + '</b>' + flag + '<br><small style="color:var(--ink-faint)">' + esc(it.unit || '') + '</small></td>' +
      '<td>' + esc(it.sku) + '</td><td>' + money(it.price) + '</td><td>' + it.stock + '</td>' +
      '<td>' + (it.aisle === 1 ? 'Aisle 1' : 'Aisle 2') + '</td>' +
      '<td><div class="row-btns"><button class="mini-btn" data-edit="' + it.sku + '">Edit</button>' +
      '<button class="mini-btn" data-del="' + it.sku + '">Delete</button></div></td>';
    tb.appendChild(tr);
  });
  tb.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', ()=> startEdit(b.dataset.edit)));
  tb.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', ()=>{
    const it = bySku(b.dataset.del);
    if (confirm('Delete "' + it.name + '" from the catalog? It disappears from the shelf, the list, and the agent API.')){
      catalog = catalog.filter(i => i.sku !== it.sku);
      cart = cart.filter(c => c.sku !== it.sku);
      saveLS(LS.cat, catalog); refreshAll(); toast('Item deleted');
    }
  }));
}
function startEdit(sku){
  const it = bySku(sku); if (!it) return;
  $('#invId').value = it.sku;
  $('#invName').value = it.name; $('#invSku').value = it.sku;
  $('#invPrice').value = it.price; $('#invStock').value = it.stock;
  $('#invAisle').value = String(it.aisle); $('#invUnit').value = it.unit || '';
  $('#invColor').value = it.color || '#4fa8c9';
  $('#invSaveBtn').textContent = 'Save changes';
  $('#invCancelBtn').classList.remove('hidden');
  $('#invForm').scrollIntoView({behavior:'smooth', block:'center'});
}
function resetInvForm(){
  $('#invForm').reset(); $('#invId').value = '';
  $('#invSaveBtn').textContent = 'Add item';
  $('#invCancelBtn').classList.add('hidden');
}
$('#invCancelBtn').addEventListener('click', resetInvForm);
$('#invForm').addEventListener('submit', e => {
  e.preventDefault();
  const editingSku = $('#invId').value;
  const data = {
    name: $('#invName').value.trim(),
    sku: $('#invSku').value.trim().toUpperCase(),
    price: Math.max(0, parseFloat($('#invPrice').value || '0')),
    stock: Math.max(0, parseInt($('#invStock').value || '0', 10)),
    aisle: parseInt($('#invAisle').value, 10),
    unit: $('#invUnit').value.trim(),
    color: $('#invColor').value
  };
  if (!data.name || !data.sku) return toast('Name and SKU are required');
  if (editingSku){
    const it = bySku(editingSku); if (!it) return;
    if (data.sku !== editingSku && bySku(data.sku)) return toast('⚠️ That SKU already exists');
    Object.assign(it, data);
    it.short = it.short || data.name.split(' ').slice(0,2).join(' ').toUpperCase();
    cart.forEach(c => { if (c.sku === editingSku) c.sku = data.sku; });
    toast('Item updated — shelf + API in sync ✅');
  } else {
    if (bySku(data.sku)) return toast('⚠️ That SKU already exists');
    const nextId = catalog.reduce((m,i)=> Math.max(m, i.id), 0) + 1;
    catalog.push({id: nextId, short: data.name.split(' ').slice(0,2).join(' ').toUpperCase(),
      blurb: 'Freshly added by the store owner.', ...data});
    toast('Item added to the shelf ✅');
  }
  saveLS(LS.cat, catalog); resetInvForm(); refreshAll();
});

/* ============================================================
   ADMIN — orders + stats
   ============================================================ */
function renderOrders(){
  const tb = $('#ordersTable tbody'); tb.innerHTML = '';
  $('#ordersEmpty').style.display = orders.length ? 'none' : 'block';
  orders.forEach(o => {
    const tr = document.createElement('tr');
    const itemsTxt = o.items.map(i => i.qty + ' × ' + esc(i.name)).join('<br>');
    const payTxt = o.payment && o.payment.method === 'x402'
      ? 'x402 · USDC<br><small style="color:var(--ink-faint)">' + esc(o.payment.ref || '') + '</small>'
      : 'Card · Stripe (demo)';
    tr.innerHTML = '<td><b>' + o.id + '</b><br><small style="color:var(--ink-faint)">' +
        new Date(o.ts).toLocaleString() + '</small></td>' +
      '<td>' + esc(o.buyer) + '</td>' +
      '<td><span class="type-badge type-' + o.buyerType + '">' + o.buyerType.toUpperCase() + '</span></td>' +
      '<td>' + itemsTxt + '</td><td><b>' + money(o.total) + '</b></td>' +
      '<td>' + payTxt + '</td><td>' + o.status + '</td>';
    tb.appendChild(tr);
  });
  $('#statItems').textContent = catalog.length;
  $('#statLow').textContent = catalog.filter(i => i.stock < 5).length;
  $('#statOrders').textContent = orders.length;
  $('#statRevenue').textContent = money(orders.reduce((s,o)=> s + o.total, 0));
}
function renderAdmin(){ renderInventory(); renderOrders(); }
$('#resetBtn').addEventListener('click', ()=>{
  if (!confirm('Reset all demo data (catalog, orders, settings, coin) back to the seed?')) return;
  Object.values(LS).forEach(k => localStorage.removeItem(k));
  location.hash = '#/store'; location.reload();
});

/* ============================================================
   ADMIN — Store Coin Maker (concept/demo)
   ============================================================ */
function coinExplainerText(purpose){
  if (purpose === 'loyalty') return '🎁 <b>How it works in your store:</b> customers earn coins on every purchase and trade them for rewards you set — discounts, free items, early access. Coins stay inside your store as loyalty value.';
  if (purpose === 'payment') return '💳 <b>How it works in your store:</b> customers hold your coin and spend it at checkout like store credit — you set the earn-back offers that bring them in. Checkout accepts it alongside cards.';
  return '🔁 <b>How it works in your store:</b> customers <b>earn</b> coins on every purchase and <b>spend</b> them at checkout — a full loop: shop → earn → return → spend. You set earn rates and what coins buy.';
}
function renderCoin(){
  const c = coin || {name:'EssentialCoin', ticker:'ESS', supply:1000000, purpose:'both'};
  $('#coinName').value = c.name; $('#coinTicker').value = c.ticker;
  $('#coinSupply').value = c.supply; $('#coinPurpose').value = c.purpose;
  updateCoinPreview();
}
function updateCoinPreview(){
  const name = $('#coinName').value.trim() || 'YourCoin';
  const ticker = ($('#coinTicker').value.trim() || 'COIN').toUpperCase();
  const supply = parseInt($('#coinSupply').value || '0', 10);
  $('#coinVisualSym').textContent = ticker;
  $('#coinCardName').textContent = name;
  $('#coinCardMeta').textContent = ticker + ' · Supply ' + supply.toLocaleString();
  $('#coinExplainer').innerHTML = coinExplainerText($('#coinPurpose').value) +
    '<br><small style="color:var(--ink-faint)">Concept preview only — no token exists. Real issuance requires per-business legal review.</small>';
}
['coinName','coinTicker','coinSupply','coinPurpose'].forEach(id =>
  $('#' + id).addEventListener('input', updateCoinPreview));
$('#coinSaveBtn').addEventListener('click', ()=>{
  coin = {name: $('#coinName').value.trim() || 'YourCoin',
    ticker: ($('#coinTicker').value.trim() || 'COIN').toUpperCase(),
    supply: parseInt($('#coinSupply').value || '0', 10),
    purpose: $('#coinPurpose').value, savedAt: new Date().toISOString()};
  saveLS(LS.coin, coin); updateCoinPreview();
  $('#coinResult').innerHTML = '✅ Coin design saved (concept). When issuance is legally cleared for your business, this design becomes the mint spec.';
  toast('Coin design saved 🪙 (concept)');
});

/* ============================================================
   ADMIN — Workshops academy
   ============================================================ */
const WORKSHOPS = [
  {n:1, title:'Set Up Your Store — From Empty Room to Open for Business', runtime:'~2 min', ready:true,
   file:'workshops/workshop-01-setup.mp4', poster:'🎬',
   promise:'Stand up your storefront, stock the shelves, and take your first order — human and agent.'},
  {n:2, title:'Inventory Mastery', runtime:'~3 min', ready:false, poster:'📦',
   promise:'One catalog that runs your shelves, your web list, and the agent API — pricing, stock, and low-stock discipline.'},
  {n:3, title:'Selling to Humans AND Agents', runtime:'~4 min', ready:false, poster:'🤖',
   promise:'How agent buyers read your catalog, place orders, and pay in full with x402 USDC — while humans check out by card.'},
  {n:4, title:'Your Store Coin', runtime:'~3 min', ready:false, poster:'🪙',
   promise:'Design a loyalty-and-payment coin for your store — and the legal gates that come before any real issuance.'},
  {n:5, title:'Marketing Your Virtual Store', runtime:'~3 min', ready:false, poster:'📣',
   promise:'Shareable addresses, districts, and drops: getting shoppers — and their agents — through your virtual door.'},
  {n:6, title:'The Future of This Sector', runtime:'~2 min', ready:true,
   file:'workshops/workshop-06-future.mp4', poster:'🔮',
   promise:'Immersive shelves plus machine customers: where retail goes when agents shop alongside people.'}
];
function renderWorkshops(){
  $('#wsGrid').innerHTML = WORKSHOPS.map(w =>
    '<div class="ws-card">' +
      (w.ready
        ? '<video controls preload="metadata" src="' + w.file + '"></video>'
        : '<div class="ws-poster">' + w.poster + '</div>') +
      '<div class="ws-info"><div class="ws-num">WORKSHOP ' + w.n + '</div>' +
      '<div class="ws-title">' + esc(w.title) + '</div>' +
      '<div class="ws-promise">' + esc(w.promise) + '</div>' +
      '<div class="ws-meta"><span class="ws-runtime">⏱ ' + w.runtime + '</span>' +
      (w.ready ? '<span class="ws-status ws-ready">READY TO WATCH</span>'
               : '<span class="ws-status ws-prod">IN PRODUCTION</span>') +
      '</div></div></div>').join('');
}

/* ============================================================
   BOOT
   ============================================================ */
renderStoreHeader();
renderWorkshops();
renderCoin();
refreshAll();
const startView = (location.hash || '').replace('#/', '');
showView(['store', 'agent', 'admin'].includes(startView) ? startView : 'store');
window.addEventListener('hashchange', ()=>{
  const v = (location.hash || '').replace('#/', '');
  if (['store', 'agent', 'admin'].includes(v)) showView(v);
});
