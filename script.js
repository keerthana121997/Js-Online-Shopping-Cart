const cartContainer = document.getElementById("cartContainer");
const fb = document.getElementById("feedback");
const productsContainer = document.getElementById("productsContainer");
const clearCartBtn = document.getElementById("clearcart");
const sortOrderBtn = document.getElementById("btnOrder");
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "SmartWatch",
    price: 60000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 9000,
  },
];

// empty cart
const cart = [];
let timerId;
// Accessing through onclick function

products.forEach((item) => {
  const divElement = document.createElement("div");
  divElement.className = "product-row";
  divElement.innerHTML = `<p>${item.name}- Rs. ${item.price} </p>
  <button onclick="addToCart(${item.id})" > Add To Cart </button>`;
  productsContainer.appendChild(divElement);
});

function addToCart(id) {
  // check if this product is previously added or not in the cart
  const isProductAvailable = cart.some(function (product) {
    return product.id === id;
  });

  if (isProductAvailable) {
    updateFeedback(
      `${products[id - 1].name} is already added to cart`,
      "error"
    );
    return;
  }
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });
  cart.push(productToAdd);
  renderCartDetails();

  const { id: pid, name, price } = productToAdd;
  updateFeedback(`${name} is added to cart`, "success");
}

function removeProduct(pid) {
  const updatedCart = cart.findIndex((product) => product.id === pid);
  console.log("updatedCart", updatedCart);
  cart.splice(updatedCart, 1);
  renderCartDetails();
  updateFeedback(
    `${cart[updatedCart].name} Item is Removed from Cart`,
    "error"
  );
  console.log("cart", cart);
}

function renderCartDetails() {
  cartContainer.innerHTML = " ";
  cart.forEach(function (product) {
    const { id: pid, name, price } = product;
    const cartItemRow = `
  <div class= "product-row">
    <p> ${name} - Rs ${price}</p>
    <button onclick="removeProduct(${pid})"> Remove </button>
    </div>
     `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);

    // console.log("cartContainer", cartContainer);
  });

  // let totalPrice = 0;
  // for (let index = 0; index < cart.length; index++) {
  //   totalPrice = totalPrice + cart[index].price;
  // }

  // use reduce()
  const totalPrice = cart.reduce(function (acc, currProduct) {
    return acc + currProduct.price;
  }, 0);

  document.getElementById("totalprice").textContent = `Rs.${totalPrice}`;
}

function updateFeedback(msg, type) {
  clearTimeout(timerId);
  fb.style.display = "block";
  if (type === "success") {
    fb.style.backgroundColor = "green";
  }

  if (type === "error") {
    fb.style.backgroundColor = "red";
  }

  fb.textContent = msg;

  timerId = setTimeout(function () {
    fb.style.display = "none";
  }, 3000);
}
function sortOrder() {
  console.log(" sort order clicked");
  const res1 = cart.sort(function (item1, item2) {
    return item1.price - item2.price;
  });
  renderCartDetails();
}
sortOrderBtn.addEventListener("click", sortOrder);
function clearcart() {
  cart.length = 0;
  renderCartDetails();
  updateFeedback("Cart is cleared", "success");
}
clearCartBtn.addEventListener("click", clearcart);

// function addToCart(id) {
//   console.log("add to cart", id);

//   const cart = document.getElementById("cartContainer");
//   console.log("cart", cart);
//   const productrow1 = `<div class="product-row">
//                 <p>${products[id - 1].name} - ${products[id - 1].price}</p>
//                 <button onclick="removeProduct(${
//                   products[id - 1].id
//                 })">Remove</button>
//             </div>`;
//   cart.insertAdjacentHTML("beforeend", productrow1);

// }

// const productRow = `
// <div class="product-row">
// <p> ${item.name} </p>
// <button> Add to Cart </button>
// </div>`;

// console.log(productRow);
// productsContainer[0].insertAdjacentHTML("beforeend", productRow);

// creating html by instance - success case
