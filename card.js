// هستخدم ال localstorage في كل حاجه في الصفحه
//هستخدم بردو ال file.json علشان استدعي
window.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById('prodectCard');

  if (cart.length === 0) {
    container.innerHTML = "<p>The cart is empty</p>";
    return;
  }

  container.innerHTML = "";

  cart.forEach((product, index) => {
    let div = document.createElement("div");

    div.className = "cart-item";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="info">
        <h4>${product.name}</h4>
        <p>Price: $${product.price}</p>
        <div class="quantity">
          <button onclick="decrease(${index})">-</button>
          <span>${product.quantity || 1}</span>
          <button onclick="increase(${index})">+</button>
        </div>
        <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
      </div>
    `;
    container.appendChild(div);
  });

  
  let total = cart.reduce((sum, product) => {
    return sum + (product.price * (product.quantity || 1));
  }, 0);

  const totalElement = document.createElement("p");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  totalElement.className = "total-price";
  container.appendChild(totalElement);

  
  const clearBtn = document.createElement("button");
  clearBtn.textContent = " Clear Cart";
  clearBtn.className = "clear-cart-btn";
  clearBtn.onclick = clearCart;
  container.appendChild(clearBtn);
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function increase(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function decrease(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = Math.max(1, (cart[index].quantity || 1) - 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}
