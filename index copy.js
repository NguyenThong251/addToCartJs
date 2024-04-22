fetch("http://localhost:3000/sanpam")
  .then((reponse) => reponse.json())
  .then((data) => {
    const dataProduct = data;
    // const dataProduct = data.filter((item) => item.category == "Quần");

    showdata(dataProduct);
  });
var resultProduct = document.getElementById("resultProduct");
function showdata(data) {
  let htmlProduct = "";
  data.forEach((item) => {
    htmlProduct += ` <div class="col-xl-3 col-lg-4 col-sm-6">
    <div class="card">
      <img id="imgProduct" src="./img/${item.image}" class="card-img-top" alt="..." height="280"/>
      <div class="card-body">
        <h5 id="nameProduct" class="card-title">${item.name}</h5>
        <div id="categoryProduct" class="category">${item.category}</div>
        <div class="price">
          <span id="priceNewProduct" class="price-sale">${item.price}Đ</span>
          <del id="priceOldProduct" class="price-old">${item.priceold}Đ</del>
        </div>
        <button id="addcart" class="btn btn-primary addcart">Add to cart</button>
      </div>
    </div>
  </div>`;
  });
  resultProduct.innerHTML = htmlProduct;

  ///LOGIC GIO HANG
  const addToCartButtons = document.querySelectorAll(".addcart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

//  Logic addtocart
// var addCart = document.getElementById("addcart");
// var quantity = document.getElementById("quantity");
// let cart = [];
// let listcarts = [];
// const total = document.querySelector(".total");
// const quantity = document.querySelector(".quantity");
// const addToCart = (key) => {
//   if ((listcarts[key] = null)) {
//     listcarts[key]= JSON.parse(JSON.stringify())
//   }
// };
//  LAY PHAN TU
function addToCart(event) {
  const button = event.target;
  const product = button.closest(".card");
  const productName = product.querySelector(".card-body h5").innerText;
  const productCategory = product.querySelector(
    ".card-body .category"
  ).innerText;
  const productPriceNew = product.querySelector(
    ".card-body .price-sale"
  ).innerText;
  const productPriceOld = product.querySelector(
    ".card-body .price-old"
  ).innerText;
  const productImg = product.querySelector(".card-img-top").src;
  // alert(`Added to cart: ${productImg}`);
  addCart(
    productName,
    productCategory,
    productPriceNew,
    productPriceOld,
    productImg
  );
}

function addCart(
  productName,
  productCategory,
  productPriceNew,
  productPriceOld,
  productImg
) {
  // let htmlViewCartModal = "";
  var addViewCartModal = document.getElementById("viewCartModal");
  // xử lí product trùng
  var cartItems = document.querySelectorAll("#viewCartProModal");
  var productAlreadyExists = false;

  cartItems.forEach((cartItem) => {
    var itemName = cartItem.querySelector(".modal-product-name").textContent;
    if (itemName === productName) {
      // If product name matches, increment quantity
      var quantityInput = cartItem.querySelector(".quatityViewCart");
      var currentQuantity = parseInt(quantityInput.value);
      quantityInput.value = currentQuantity + 1;
      productAlreadyExists = true;
      return; // Exit the loop since we found a match
    }
  });
  if (!productAlreadyExists) {
    // xử lí product end
    addViewCartModal.innerHTML += ` <li id="viewCartProModal"
  class="list-group-item mx-1 my-4 modal-cart-item border-bottom border-secondary border-2 mb-3 pb-3"
>
  <div class="row">
    <div class="col-4 overflow-hidden rounded-2">
      <img src="${productImg}" class="img-cover" alt="" width="80" />
    </div>
    <div class="col-8">
      <div
        class="d-flex justify-content-between align-items-center"
      >
        <h3 class="modal-product-name fs-6">${productName}</h3>
        <span class="modal-product-name">${productCategory}</span>
        <code class="cursor remove-pro"
          ><ion-icon class="fs-5" name="close-outline"></ion-icon
        ></code>
      </div>
      <span class="modal-product-price">
        <span class="modal-product-price-content">${productPriceNew}</span>
      </span>
      <span class="modal-product-price-old">
        <del>${productPriceOld}</del>
      </span>

      <div class="modal-cart-qty text-center mt-1">
        <div
          class="modal-cart-qty-plus-minus border rounded-2 m-0 d-flex align-items-center justify-content-center border-1"
        >
          <button type="button" class="addValueQuatity">
            <ion-icon name="add-outline"></ion-icon>
          </button>
          <input
            type="text"
            name=""
            value="1"
            minlength="1"
            maxlength="20"
            class="quatityViewCart text-center border-0"
            id=""
          />
          <button type="button" class="minusValueQuatity">
            <ion-icon name="remove-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</li>`;
  }
  /// gọi hàm total
  cartTotal();
  // gọi hàm xóa
  detele();
  // change input

  attachQuantityListeners();
}
//  TOTAL
function cartTotal() {
  var cartItems = document.querySelectorAll("#viewCartProModal");
  var totalPriceModal = 0;
  cartItems.forEach((cartItem) => {
    var viewCartModalQuantity =
      cartItem.querySelector(".quatityViewCart").value;
    var viewCartModalPrice = cartItem.querySelector(
      ".modal-product-price-content"
    ).textContent; // Sử dụng textContent thay vì innerHTML
    viewCartModalPrice = viewCartModalPrice; // Loại bỏ ký tự 'Đ'
    var totalPrice =
      parseFloat(viewCartModalPrice) * parseInt(viewCartModalQuantity);
    // toLoca1eString('de-DE')

    totalPriceModal = totalPriceModal + totalPrice;
  });
  var totalCartViewModalShow = document.querySelector(".totalCartViewShow");
  // console.log(totalCartViewModalShow);
  totalCartViewModalShow.innerText = totalPriceModal;
}

// DELETE
function detele() {
  var cartItems = document.querySelectorAll("#viewCartProModal");

  cartItems.forEach((cartItem) => {
    var btnDelete = cartItem.querySelectorAll(".remove-pro");
    btnDelete[0].addEventListener("click", function (event) {
      const removeButton = event.target;
      const cartItem = removeButton.closest("#viewCartProModal");
      // console.log(cartItem);
      cartItem.remove();
      cartTotal();
    });
  });
}

// INPUT CHANGE
function inputChange() {
  var cartItems = document.querySelectorAll("#viewCartProModal");

  cartItems.forEach((cartItem) => {
    var inputValueViewCartModal = cartItem.querySelector(".quatityViewCart");

    inputValueViewCartModal.addEventListener("change", () => {
      cartTotal();
    });
  });
}

//  ADD MINUS
// Function to handle increase in quantity
function increaseQuantity(inputElement) {
  let currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue + 1;
  cartTotal();
}

// Function to handle decrease in quantity
function decreaseQuantity(inputElement, cartItem) {
  let currentValue = parseInt(inputElement.value);
  if (currentValue > 1) {
    inputElement.value = currentValue - 1;
    cartTotal();
  } else {
    // If quantity is reduced to 0, remove the corresponding cart item
    cartItem.remove();
    cartTotal();
  }
}

// Function to attach event listeners for quantity buttons
function attachQuantityListeners() {
  var cartItems = document.querySelectorAll("#viewCartProModal");
  cartItems.forEach((cartItem) => {
    var addButton = cartItem.querySelector(".addValueQuatity");
    var minusButton = cartItem.querySelector(".minusValueQuatity");
    var inputElement = cartItem.querySelector(".quatityViewCart");

    addButton.addEventListener("click", () => {
      increaseQuantity(inputElement);
    });

    minusButton.addEventListener("click", () => {
      decreaseQuantity(inputElement, cartItem);
    });
  });
}
