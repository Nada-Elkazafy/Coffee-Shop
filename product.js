 window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetailsContainer");
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    container.innerHTML = "<p>No product selected.</p>";
    return;
  }

  
  selectedQuantity = product.quantity || 1;

  container.innerHTML = `
    <div class="product-details">
      <img src="${product.image}" alt="${product.name}" />
      <div class="details">
        <h2>${product.name}</h2>
        <h4>⭐️⭐️⭐️⭐️⭐️</h4>
        <p class="price"> $${product.price}</p>
        <p class="des">${product.description}</p>
        <div class="quantity">
          <button onclick="decrease()">-</button>
          <span id="qty">${selectedQuantity}</span>
          <button onclick="increase()">+</button>
        </div>
        <button class="card" id="addToCartBtn">Add To Cart</button>
        <button class="back-btn" onclick="window.history.back()">← Back</button>
      </div>
    </div>
    <div id="relatedProducts" class="related-products-section">
      <h3>YOU MIGHT ALSO LIKE</h3>
      <div class="related-products" id="relatedList"></div>
    </div>
  `;

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    product.quantity = selectedQuantity;

   
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    
  });

  
  fetch("prodects.json")
    .then(res => res.json())
    .then(data => {
      const related = data.filter(p =>
        p.category === product.category && p.id !== product.id
      ).slice(0, 4);

      const relatedContainer = document.getElementById("relatedList");
      related.forEach(item => {
        const div = document.createElement("div");
        div.className = "related-item";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
        `;
        div.addEventListener("click", () => {
          localStorage.setItem("selectedProduct", JSON.stringify(item));
          location.reload();
        });
        relatedContainer.appendChild(div);
      });
    });
});

let selectedQuantity = 1;

function increase() {
  selectedQuantity++;
  document.getElementById("qty").textContent = selectedQuantity;
}

function decrease() {
  selectedQuantity = Math.max(1, selectedQuantity - 1);
  document.getElementById("qty").textContent = selectedQuantity;
}
