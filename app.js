const PRODUCTS = [
 {id:"DS001",name:"Everyday Water Bottle",category:"Lifestyle",price:1299,emoji:"🧴",description:"A reusable everyday bottle for work, study and travel."},
 {id:"DS002",name:"Classic Canvas Tote",category:"Accessories",price:1899,emoji:"👜",description:"A simple carry-all tote for daily essentials."},
 {id:"DS003",name:"Wireless Headphones",category:"Electronics",price:4499,emoji:"🎧",description:"Comfortable demo headphones for music and calls."},
 {id:"DS004",name:"Desk Organizer",category:"Home",price:1599,emoji:"🗂️",description:"Keep your workspace neat with this compact organizer."},
 {id:"DS005",name:"Minimal Notebook Set",category:"Stationery",price:899,emoji:"📓",description:"A clean notebook set for notes and planning."},
 {id:"DS006",name:"Travel Coffee Mug",category:"Lifestyle",price:2199,emoji:"☕",description:"A reusable mug for coffee on the go."},
 {id:"DS007",name:"Portable Bluetooth Speaker",category:"Electronics",price:3499,emoji:"🔊",description:"A compact speaker for your desk or travel bag."},
 {id:"DS008",name:"Everyday Backpack",category:"Accessories",price:5299,emoji:"🎒",description:"A practical backpack with room for daily essentials."},
 {id:"DS009",name:"Ceramic Table Lamp",category:"Home",price:2799,emoji:"💡",description:"A warm accent lamp for a study or bedside table."}
];
const money = n => "Rs. " + Number(n).toLocaleString("en-PK");
const readCart = () => { try{return JSON.parse(localStorage.getItem("demo_cart")||"[]")}catch(e){return []} };
const saveCart = c => {localStorage.setItem("demo_cart",JSON.stringify(c));updateCount()};
const itemFor = p => ({item_id:p.id,item_name:p.name,price:p.price,quantity:1});
function updateCount(){const count=readCart().reduce((s,x)=>s+x.quantity,0);document.querySelectorAll("[data-cart-count]").forEach(e=>e.textContent=count)}
function pushEcommerce(event,items,value){window.dataLayer=window.dataLayer||[];window.dataLayer.push({ecommerce:null});window.dataLayer.push({event,ecommerce:{currency:"PKR",value,items}})}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);let c=readCart();const found=c.find(x=>x.id===id);if(found)found.quantity++;else c.push({id,quantity:1});saveCart(c);pushEcommerce("add_to_cart",[itemFor(p)],p.price);alert(p.name+" added to cart")}
function renderHome(){
 const grid=document.getElementById("product-grid");if(!grid)return;
 grid.innerHTML=PRODUCTS.map(p=>`<article class="product"><a href="product.html?id=${p.id}" style="text-decoration:none;color:inherit"><div class="photo">${p.emoji}</div><div class="info"><div class="category">${p.category}</div><div class="name">${p.name}</div><div class="price">${money(p.price)}</div></div></a><div class="info" style="padding-top:0"><button onclick="addToCart('${p.id}')">Add to Cart</button></div></article>`).join("");
 pushEcommerce("view_item_list",PRODUCTS.map(itemFor),PRODUCTS.reduce((s,p)=>s+p.price,0));
}
function renderProduct(){
 const root=document.getElementById("product-detail");if(!root)return;
 const id=new URLSearchParams(location.search).get("id");const p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[0];
 root.innerHTML=`<div class="detail"><div class="photo">${p.emoji}</div><div><div class="category">${p.category}</div><h1>${p.name}</h1><div class="price">${money(p.price)}</div><p>${p.description}</p><div class="actions"><button onclick="addToCart('${p.id}')">Add to Cart</button><a class="button secondary" href="cart.html">View Cart</a></div></div></div>`;
 pushEcommerce("view_item",[itemFor(p)],p.price);
}
function renderCart(){
 const root=document.getElementById("cart-items");if(!root)return;const c=readCart();
 if(!c.length){root.innerHTML='<div class="panel">Your cart is empty. <a href="index.html">Browse products</a>.</div>';document.getElementById("cart-summary").innerHTML="Subtotal: Rs. 0";return}
 root.innerHTML=c.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return `<div class="cart-row"><div class="photo">${p.emoji}</div><div><b>${p.name}</b><div>${money(p.price)}</div><button class="secondary" onclick="removeItem('${p.id}')">Remove</button></div><div><input class="qty" type="number" min="1" value="${x.quantity}" onchange="changeQty('${p.id}',this.value)"></div></div>`}).join("");
 const total=c.reduce((s,x)=>s+PRODUCTS.find(p=>p.id===x.id).price*x.quantity,0);
 document.getElementById("cart-summary").innerHTML=`<h2>Subtotal: ${money(total)}</h2><p class="sub">Demo shipping: Free</p><a class="button" href="checkout.html" onclick="beginCheckout()">Proceed to Checkout</a>`;
 pushEcommerce("view_cart",c.map(x=>({...itemFor(PRODUCTS.find(p=>p.id===x.id)),quantity:x.quantity})),total);
}
function removeItem(id){saveCart(readCart().filter(x=>x.id!==id));renderCart()}
function changeQty(id,q){let c=readCart();let x=c.find(y=>y.id===id);if(x)x.quantity=Math.max(1,Number(q)||1);saveCart(c);renderCart()}
function beginCheckout(){const c=readCart();const items=c.map(x=>({...itemFor(PRODUCTS.find(p=>p.id===x.id)),quantity:x.quantity}));const total=items.reduce((s,x)=>s+x.price*x.quantity,0);pushEcommerce("begin_checkout",items,total)}
function renderCheckout(){const form=document.getElementById("checkout-form");if(!form)return;const c=readCart();if(!c.length){form.innerHTML='<p>Your cart is empty. <a href="index.html">Shop products</a>.</p>';return}
 const items=c.map(x=>({...itemFor(PRODUCTS.find(p=>p.id===x.id)),quantity:x.quantity}));const total=items.reduce((s,x)=>s+x.price*x.quantity,0);document.getElementById("checkout-total").textContent="Demo order total: "+money(total);
 form.addEventListener("submit",e=>{e.preventDefault();const orderId="DEMO"+Date.now().toString().slice(-7);pushEcommerce("purchase",items,total);document.getElementById("order-result").innerHTML=`<div class="panel"><h2>Demo order placed!</h2><p>Order reference: <b>${orderId}</b></p><p>No payment was collected.</p><a href="index.html">Return to store</a></div>`;localStorage.removeItem("demo_cart");updateCount();form.remove()});
}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderHome();renderProduct();renderCart();renderCheckout()});
