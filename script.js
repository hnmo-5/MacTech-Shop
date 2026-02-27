const placeholderImg = "https://via.placeholder.com/180x120?text=MacTech";
const products = [
  { id: 1, name: "MacBook Air M1 (2020)", color: "خاکستری", model: "Air", year: 2020, ram: 8, cpu: "M1", price: 37500000, img: "https://via.placeholder.com/180x120?text=Air+M1+2020" },
  { id: 2, name: "MacBook Air M2 (2022)", color: "طلایی", model: "Air", year: 2022, ram: 8, cpu: "M2", price: 46500000, img: "https://via.placeholder.com/180x120?text=Air+M2+2022" },
  { id: 3, name: "MacBook Air M3 (2024)", color: "مشکی", model: "Air", year: 2024, ram: 16, cpu: "M3", price: 52000000, img: "https://via.placeholder.com/180x120?text=Air+M3+2024" },
  { id: 4, name: "MacBook Pro 13 M2 (2022)", color: "نقره‌ای", model: "Pro", year: 2022, ram: 16, cpu: "M2", price: 55500000, img: "https://via.placeholder.com/180x120?text=Pro+13+M2" },
  { id: 5, name: "MacBook Pro 14 M2 (2023)", color: "خاکستری", model: "Pro", year: 2023, ram: 16, cpu: "M2", price: 72500000, img: "https://via.placeholder.com/180x120?text=Pro+14+M2" },
  { id: 6, name: "MacBook Pro 16 M2 (2023)", color: "نقره‌ای", model: "Pro", year: 2023, ram: 32, cpu: "M2", price: 87500000, img: "https://via.placeholder.com/180x120?text=Pro+16+M2" },
  { id: 7, name: "MacBook Air M2 15-inch (2023)", color: "طلایی", model: "Air", year: 2023, ram: 8, cpu: "M2", price: 49500000, img: "https://via.placeholder.com/180x120?text=Air+M2+15" },
  { id: 8, name: "MacBook Pro 14 M3 (2024)", color: "مشکی", model: "Pro", year: 2024, ram: 16, cpu: "M3", price: 78500000, img: "https://via.placeholder.com/180x120?text=Pro+14+M3" },
  { id: 9, name: "MacBook Pro 16 M3 Max (2024)", color: "خاکستری", model: "Pro", year: 2024, ram: 32, cpu: "M3", price: 99900000, img: "https://via.placeholder.com/180x120?text=Pro+16+M3" },
  { id: 10, name: "MacBook Air Gold (2020)", color: "طلایی", model: "Air", year: 2020, ram: 8, cpu: "M1", price: 38500000, img: "https://via.placeholder.com/180x120?text=Air+Gold+2020" },
  { id: 11, name: "MacBook Air Silver (M2)", color: "نقره‌ای", model: "Air", year: 2022, ram: 8, cpu: "M2", price: 46500000, img: "https://via.placeholder.com/180x120?text=Air+Silver+M2" },
  { id: 12, name: "MacBook Pro Space Gray (M3)", color: "خاکستری", model: "Pro", year: 2024, ram: 16, cpu: "M3", price: 79500000, img: "https://via.placeholder.com/180x120?text=Pro+SpaceGray+M3" }
];

const productsRow = document.getElementById("products-row");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list) {
  productsRow.innerHTML = "";
  list.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card card-product h-100">
        <img src="${p.img}" onerror="this.src='${placeholderImg}'" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${p.name}</h6>
          <p class="price mb-3">${p.price.toLocaleString()} تومان</p>
          <button class="btn btn-add mt-auto add-to-cart" data-id="${p.id}">افزودن به سبد خرید</button>
        </div>
      </div>`;
    productsRow.appendChild(col);
  });
}
renderProducts(products);

document.getElementById("filter-form").addEventListener("change", () => {
  const color = document.getElementById("color-filter").value;
  const model = document.getElementById("model-filter").value;
  const year = document.getElementById("year-filter").value;
  const cpu = document.getElementById("cpu-filter").value;
  const filtered = products.filter(p =>
    (color === "all" || p.color === color) &&
    (model === "all" || p.model === model) &&
    (year === "all" || p.year.toString() === year) &&
    (cpu === "all" || p.cpu === cpu)
  );
  renderProducts(filtered);
});

productsRow.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = Number(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if(existing){
      existing.qty += 1;
    }else{
      cart.push({...product, qty:1});
    }
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
cartBtn.addEventListener("click", () => cartModal.show());

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item)=>sum+item.qty,0);
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${item.name} x${item.qty}<span>${(item.price*item.qty).toLocaleString()} تومان <button class="btn btn-sm btn-danger ms-2 remove-item" data-index="${index}">×</button></span>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toLocaleString();
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index,1);
      updateCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
  localStorage.setItem("cart", JSON.stringify(cart));
});

checkoutBtn.addEventListener("click", () => {
  if(cart.length===0){
    alert("سبد خرید خالی است!");
  }else{
    window.location.href="info.html";
  }
});

updateCart();