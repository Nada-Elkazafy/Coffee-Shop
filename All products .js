//في الصفحه دي هستخدم بس  file.json مش هستخدم ال localstorage

let allProducts = [];
let filteredProducts = [];

fetch('prodects.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = data; 
    

    const selectedCategory = localStorage.getItem("selectedCategory");
const titleElement = document.getElementById("products-title");

if (selectedCategory) {
  filteredProducts = allProducts.filter(prod => prod.category.toLowerCase() === selectedCategory.toLowerCase());
  titleElement.textContent = selectedCategory;
} else {
  filteredProducts = allProducts;
  titleElement.textContent = "All Products";
}
renderProducts(filteredProducts);

  
  });

 
//يتم العرض
function renderProducts(products, page = 1) {
  const itemsPerPage = 9;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = products.slice(start, end);

  const container = document.getElementById('products');
  container.innerHTML = "";

  paginatedItems.forEach(prod => {
   
    const div = document.createElement("div");
    div.className = "product";

   
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h4>${prod.name}</h4>
      <p> $${prod.price}</p>
      <button class="add-btn">Add To Cart</button>
    `;

    //go to product page
    div.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(prod));
      window.location.href = "product.html";
    });

    
    const btn = div.querySelector(".add-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      addToCart(prod);     
    });
    
    container.appendChild(div);
  });

  
  renderPagination(products.length, page, products);
}

document.getElementById("applyFilter").addEventListener("click", () => {
  const selectedCategory = document.querySelector("li[data-category].selected")?.getAttribute("data-category");
  const selectedType = document.querySelector("button[data-taste].selected")?.getAttribute("data-taste");
  const selectedSize = document.querySelector("li[data-Size].selected")?.getAttribute("data-Size");
  const maxPrice = parseFloat(document.getElementById("priceRange").value);
  
  filteredProducts = allProducts.filter(prod => {
    return (!selectedCategory || prod.category === selectedCategory) &&
           (!selectedType || prod.type === selectedType) &&
           (!selectedSize || prod.size === selectedSize) &&
           prod.price <= maxPrice;
  });
   const titleElement = document.getElementById("products-title");
  if (selectedCategory) {
    titleElement.textContent = selectedCategory;
  } else {
    titleElement.textContent = "All Products";
  }
  


  renderProducts(filteredProducts, 1); 
});


function renderPagination(totalItems, currentPage, products) {
  const totalPages = Math.ceil(totalItems / 9);
  let paginationContainer = document.getElementById("pagination");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    document.getElementById("products").after(paginationContainer);

  }

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => renderProducts(products, i));
    paginationContainer.appendChild(btn);
  }
}

document.querySelectorAll("li[data-category]").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll("li[data-category]").forEach(i => i.classList.remove("selected"));
    item.classList.add("selected");
  



  });
});


document.querySelectorAll("button[data-taste]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("button[data-taste]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});


document.querySelectorAll("li[data-Size]").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll("li[data-Size]").forEach(i => i.classList.remove("selected"));
    item.classList.add("selected");
  });
});
//card function
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}



document.querySelector(".logo2").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.style.display = input.style.display === "none" ? "inline-block" : "none";
  input.focus(); 
});


document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const searched = allProducts.filter(prod =>
    prod.name.toLowerCase().includes(searchText)
  );

  const titleElement = document.getElementById("products-title");
  titleElement.textContent = searchText
    ? `Results for "${searchText}"`
    : "All Products";

  renderProducts(searched);
});

