const products = [
 {id:1,name:"Daily Grocery Essentials Pack",category:"Groceries",price:499,unit:"pack",seller:"MinuteDrop Store",type:"minute",emoji:"🛒",tag:"MinuteDrop pick"},
 {id:2,name:"Fresh Tomatoes",category:"Vegetables",price:35,unit:"500 g",seller:"Green Basket Local Store",type:"partner",emoji:"🍅",tag:"Fresh today"},
 {id:3,name:"Seasonal Cotton T-shirt",category:"Seasonal Wear",price:399,unit:"piece",seller:"Urban Wear Hub",type:"partner",emoji:"👕",tag:"Local partner"},
 {id:4,name:"Fresh Bread Loaf",category:"Bakery",price:55,unit:"loaf",seller:"Sunrise Bakery",type:"partner",emoji:"🍞",tag:"Baked fresh"},
 {id:5,name:"Digital BP Monitor",category:"Medical Equipment",price:1499,unit:"piece",seller:"MinuteDrop Store",type:"minute",emoji:"🩺",tag:"Consumer device"},
 {id:6,name:"Idli & Vada Breakfast Combo",category:"Tiffins & Food",price:80,unit:"combo",seller:"Amma Tiffins",type:"partner",emoji:"🍱",tag:"Local favourite"},
 {id:7,name:"Farm Fresh Spinach",category:"Vegetables",price:25,unit:"bunch",seller:"Green Basket Local Store",type:"partner",emoji:"🥬",tag:"Fresh today"},
 {id:8,name:"Everyday Cooking Oil",category:"Groceries",price:165,unit:"1 litre",seller:"MinuteDrop Store",type:"minute",emoji:"🫙",tag:"MinuteDrop pick"},
 {id:9,name:"Chocolate Pastry",category:"Bakery",price:75,unit:"piece",seller:"Sunrise Bakery",type:"partner",emoji:"🧁",tag:"Baked fresh"},
 {id:10,name:"Rain Jacket",category:"Seasonal Wear",price:699,unit:"piece",seller:"Urban Wear Hub",type:"partner",emoji:"🧥",tag:"Seasonal pick"},
 {id:11,name:"Digital Thermometer",category:"Medical Equipment",price:199,unit:"piece",seller:"MinuteDrop Store",type:"minute",emoji:"🌡️",tag:"Consumer device"},
 {id:12,name:"Masala Dosa",category:"Tiffins & Food",price:90,unit:"plate",seller:"Amma Tiffins",type:"partner",emoji:"🥞",tag:"Local favourite"}
];
let selectedCategory = "All";
let cart = [];
const $ = selector => document.querySelector(selector);
const productGrid = $("#productGrid");

function renderProducts(){
 let list = products.filter(p => (selectedCategory==="All" || p.category===selectedCategory)
   && (p.name.toLowerCase().includes($("#searchInput").value.toLowerCase()) || p.category.toLowerCase().includes($("#searchInput").value.toLowerCase()))
   && ($("#sellerSelect").value==="all" || ($("#sellerSelect").value==="minute" ? p.type==="minute" : p.type==="partner")));
 const sort = $("#sortSelect").value;
 if(sort==="low") list.sort((a,b)=>a.price-b.price);
 if(sort==="high") list.sort((a,b)=>b.price-a.price);
 productGrid.innerHTML = list.map(p=>`<article class="product-card">
   <div class="product-image"><span class="tag">${p.tag}</span>${p.emoji}</div>
   <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
   <p class="seller">Sold by <strong>${p.seller}</strong></p>
   <div class="product-bottom"><span class="price">₹${p.price} <small>/ ${p.unit}</small></span><button class="add-btn" data-add="${p.id}">+ Add</button></div></div></article>`).join("");
 $("#emptyState").hidden = list.length>0;
}
function updateCart(){
 $("#cartCount").textContent = cart.reduce((n,x)=>n+x.qty,0);
 $("#cartSubtotal").textContent = "₹"+cart.reduce((n,x)=>n+x.price*x.qty,0);
 $("#cartItems").innerHTML = cart.length ? cart.map(x=>`<div class="cart-row"><div class="cart-emoji">${x.emoji}</div><div><b>${x.name}</b><small>₹${x.price} · ${x.seller}</small></div><div class="qty"><button data-dec="${x.id}" aria-label="Decrease">−</button><b>${x.qty}</b><button data-inc="${x.id}" aria-label="Increase">+</button></div></div>`).join("") : '<p class="muted">Your cart is waiting for something good.</p>';
}
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function openCart(){ $("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show");}
productGrid.addEventListener("click",e=>{
 const id=Number(e.target.dataset.add); if(!id)return;
 const p=products.find(x=>x.id===id), found=cart.find(x=>x.id===id);
 found?found.qty++:cart.push({...p,qty:1});updateCart();toast(`${p.name} added to cart`);
});
$("#cartItems").addEventListener("click",e=>{
 const inc=Number(e.target.dataset.inc),dec=Number(e.target.dataset.dec);
 if(inc){cart.find(x=>x.id===inc).qty++}
 if(dec){const item=cart.find(x=>x.id===dec);item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.id!==dec)}
 updateCart();
});
$("#categoryGrid").addEventListener("click",e=>{
 const btn=e.target.closest("[data-category]");if(!btn)return;
 selectedCategory=btn.dataset.category;
 document.querySelectorAll(".category-card").forEach(x=>x.classList.toggle("active",x===btn));
 renderProducts();$("#products").scrollIntoView({behavior:"smooth"});
});
["searchInput","sortSelect","sellerSelect"].forEach(id=>$("#"+id).addEventListener(id==="searchInput"?"input":"change",renderProducts));
$("#cartBtn").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
$("#locationBtn").addEventListener("click",()=>$("#locationDialog").showModal());
$("#saveLocation").addEventListener("click",e=>{
 const value=$("#areaInput").value.trim();if(!value){e.preventDefault();toast("Please enter your delivery area.");return}
 $("#locationLabel").textContent=value;
});
$("#checkoutBtn").addEventListener("click",()=>{
 if(!cart.length){toast("Add a product to your cart first.");return}
 closeCart();$("#checkoutDialog").showModal();
});
$("#closeCheckout").addEventListener("click",()=>$("#checkoutDialog").close());
$("#checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();$("#checkoutDialog").close();cart=[];updateCart();
 toast("Demo checkout preview complete. No real order was placed.");
});
$("#accountBtn").addEventListener("click",()=>$("#accountDialog").showModal());
$("#mobileMenu").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#year").textContent=new Date().getFullYear();
renderProducts();updateCart();
