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
      cell.innerHTML =
        '<div class="sw" style="background:' + it.color + '">' + esc(it.short || it.name) + '</div>' +
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
  $('#pcSwatch').style.background = it.color;
  $('#pcSwatch').textContent = it.short || it.name;
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

function labelTexture(it){
  const c = document.createElement('canvas'); c.width = 512; c.height = 384;
  const g = c.getContext('2d');
  const out = it.stock <= 0;
  g.fillStyle = out ? '#5a5f6a' : it.color; g.fillRect(0,0,512,384);
  const grad = g.createLinearGradient(0,0,0,384);
  grad.addColorStop(0,'rgba(255,255,255,.28)'); grad.addColorStop(.5,'rgba(255,255,255,0)'); grad.addColorStop(1,'rgba(0,0,0,.28)');
  g.fillStyle = grad; g.fillRect(0,0,512,384);
  g.fillStyle = 'rgba(4,10,16,.88)';
  g.font = '900 54px system-ui, sans-serif'; g.textAlign = 'center';
  const words = (it.short || it.name).split(' ');
  const lines = []; let line = '';
  words.forEach(w => { if ((line + ' ' + w).trim().length > 11 && line) { lines.push(line); line = w; } else line = (line + ' ' + w).trim(); });
  if (line) lines.push(line);
  lines.slice(0,3).forEach((ln,i)=> g.fillText(ln, 256, 138 + i * 60));
  g.fillStyle = 'rgba(4,10,16,.92)'; g.fillRect(0, 308, 512, 76);
  g.fillStyle = '#2ee6ff'; g.font = '800 44px system-ui, sans-serif';
  g.fillText(out ? 'OUT OF STOCK' : '$' + Number(it.price).toFixed(2), 256, 360);
  const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4; return tex;
}
function signTexture(text, sub){
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#070b1a'; g.fillRect(0,0,1024,256);
  const grad = g.createLinearGradient(0,0,1024,0);
  grad.addColorStop(0,'#2ee6ff'); grad.addColorStop(1,'#8b5cff');
  g.fillStyle = grad; g.font = '900 92px system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText(text, 512, 118);
  g.fillStyle = '#93a4c4'; g.font = '600 44px system-ui, sans-serif';
  g.fillText(sub || '', 512, 196);
  g.strokeStyle = 'rgba(46,230,255,.6)'; g.lineWidth = 6; g.strokeRect(8,8,1008,240);
  return new THREE.CanvasTexture(c);
}
function floorTexture(){
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#0a0e1e'; g.fillRect(0,0,256,256);
  g.fillStyle = '#0d1226'; g.fillRect(2,2,252,252);
  g.strokeStyle = 'rgba(46,230,255,.20)'; g.lineWidth = 2; g.strokeRect(1,1,254,254);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(10, 14);
  return tex;
}

function buildShelfUnit(x, facing /* +1 faces +x, -1 faces -x */){
  const unit = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({color:0x1a2338, metalness:.65, roughness:.35});
  const glowMat  = new THREE.MeshBasicMaterial({color:0x2ee6ff});
  // uprights
  [-2.3, 2.3].forEach(z => {
    const up = new THREE.Mesh(new THREE.BoxGeometry(.12, 2.4, .12), frameMat);
    up.position.set(0, 1.2, z); unit.add(up);
  });
  // back panel
  const back = new THREE.Mesh(new THREE.BoxGeometry(.06, 2.4, 4.8),
    new THREE.MeshStandardMaterial({color:0x111830, metalness:.4, roughness:.6}));
  back.position.set(-facing * .34, 1.2, 0); unit.add(back);
  // shelf boards + glow strips at 3 levels
  [0.42, 1.12, 1.82].forEach(y => {
    const board = new THREE.Mesh(new THREE.BoxGeometry(.78, .06, 4.8), frameMat);
    board.position.set(0, y, 0); unit.add(board);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(.8, .025, 4.8), glowMat);
    strip.position.set(0, y - .055, 0); unit.add(strip);
  });
  const header = new THREE.Mesh(new THREE.BoxGeometry(.5, .34, 4.8),
    new THREE.MeshStandardMaterial({color:0x0d1430, emissive:0x123a4d, emissiveIntensity:.7}));
  header.position.set(0, 2.32, 0); unit.add(header);
  unit.position.x = x;
  if (facing < 0) unit.rotation.y = Math.PI;
  return unit;
}

function buildProducts(){
  if (productGroup) {
    productGroup.traverse(o => {
      if (o.isMesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
          if (m.map) m.map.dispose();
          if (m.emissiveMap) m.emissiveMap.dispose();
          m.dispose();
        });
      }
    });
    scene.remove(productGroup);
  }
  productGroup = new THREE.Group();
  const levels = [0.42, 1.12, 1.82];
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
      const out = it.stock <= 0;
      const tex = labelTexture(it);
      const front = new THREE.MeshStandardMaterial({map: tex, roughness:.5, metalness:.08,
        emissive: 0x9a9a9a, emissiveMap: tex, emissiveIntensity: out ? .35 : .8});
      const sideMat = new THREE.MeshStandardMaterial({color: out ? 0x444a56 : new THREE.Color(it.color).multiplyScalar(.72),
        roughness:.6, metalness:.1});
      // box faces: [px, nx, py, ny, pz, nz]
      const mats = [sideMat, sideMat, sideMat, sideMat, sideMat, sideMat];
      mats[facing > 0 ? 0 : 1] = front;
      const m = new THREE.Mesh(new THREE.BoxGeometry(.52, .6, .92), mats);
      m.position.set(x, level + .33, z);
      if (facing < 0) m.rotation.y = Math.PI;
      m.userData = {sku: it.sku, baseY: level + .33, pulse: 0};
      productGroup.add(m);
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
  wrap.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070f, 12, 30);
  applyBackdrop();
  camera = new THREE.PerspectiveCamera(58, 1, .1, 100);
  camera.position.set(...VIEWS.entrance.pos);
  camLookCur = new THREE.Vector3(...VIEWS.entrance.look);
  flyTo('entrance');

  // lights — cinematic retail
  scene.add(new THREE.HemisphereLight(0xbfe6ff, 0x0a0c18, .85));
  const key = new THREE.DirectionalLight(0xffffff, 1.0);
  key.position.set(4, 8, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  [[-3.4, 0x2ee6ff], [3.4, 0x8b5cff]].forEach(([x, col]) => {
    const p = new THREE.PointLight(col, .55, 9); p.position.set(x, 3.1, 0); scene.add(p);
  });

  // floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 22),
    new THREE.MeshStandardMaterial({map: floorTexture(), roughness:.35, metalness:.55}));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
  scene.add(floor);

  // ceiling light strips
  const stripMat = new THREE.MeshBasicMaterial({color:0xaad9ff});
  [-3.4, 0, 3.4].forEach(x => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(.14, .05, 9), stripMat);
    s.position.set(x, 3.4, 0); scene.add(s);
  });

  // shelf units + aisle signs
  [1, 2].forEach(a => {
    const ax = a === 1 ? -3.4 : 3.4;
    scene.add(buildShelfUnit(ax - 1.55, 1));
    scene.add(buildShelfUnit(ax + 1.55, -1));
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, .9),
      new THREE.MeshBasicMaterial({map: signTexture(a === 1 ? 'AISLE 1' : 'AISLE 2', a === 1 ? 'PANTRY STAPLES' : 'HOME & CARE'), transparent:false}));
    sign.position.set(ax, 3.0, -3.4); scene.add(sign);
  });
  // entrance hero sign
  const hero = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.6),
    new THREE.MeshBasicMaterial({map: signTexture('EVERYDAY ESSENTIALS', 'OPEN TO HUMANS + AGENTS')}));
  hero.position.set(0, 3.3, -7.2); scene.add(hero);

  buildProducts();

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
      raycaster.setFromCamera(pointerV, camera);
      const hit = raycaster.intersectObjects(productGroup.children)[0];
      const mesh = hit ? hit.object : null;
      if (hovered && hovered !== mesh) hovered.scale.setScalar(1);
      hovered = mesh;
      if (hovered) hovered.scale.setScalar(1.07);
      el.style.cursor = hovered ? 'pointer' : 'grab';
    }
  });
  el.addEventListener('pointerup', e => {
    const wasTap = downAt && !dragging && (Date.now() - downAt.t) < 450;
    downAt = null;
    if (!wasTap) return;
    pointerV.x = (e.offsetX / el.clientWidth) * 2 - 1;
    pointerV.y = -(e.offsetY / el.clientHeight) * 2 + 1;
    raycaster.setFromCamera(pointerV, camera);
    const hit = raycaster.intersectObjects(productGroup.children)[0];
    if (hit){ hit.object.userData.pulse = 1; openProduct(hit.object.userData.sku); }
  });

  window.addEventListener('resize', resizeScene);
  resizeScene();
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
        if (m !== hovered) m.scale.setScalar(s);
        m.position.y = m.userData.baseY + Math.sin(m.userData.pulse * Math.PI) * .06;
      }
    });
    renderer.render(scene, camera);
  })();
}
function resizeScene(){
  if (!renderer) return;
  const wrap = $('#scene3d');
  const w = wrap.clientWidth, h = wrap.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
function applyBackdrop(){
  if (!scene) return;
  if (settings.mode === 'scanned' && settings.backdrop){
    new THREE.TextureLoader().load(settings.backdrop, tex => { scene.background = tex; scene.fog = null; });
    $('#hudModeChip').textContent = 'SCANNED STORE · YOUR SPACE';
  } else {
    scene.background = new THREE.Color(0x05070f);
    scene.fog = new THREE.Fog(0x05070f, 12, 30);
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
