const increamentBtn = document.querySelector(".plus");
const decreamentBtn = document.querySelector(".minus");
const cartQty = document.querySelector(".count");
const addToCart = document.querySelector(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart-container");
const cartIconContainer = document.querySelector(".cart-icon-container");
const itemPrice = document.querySelector(".price");
const cartItems = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");
const productImageContainer = document.querySelector(".product-image");
const productDesc = document.querySelector(".product-desc");
const productName = document.querySelector(".product-name");
const thumbnailImageContainer = document.querySelector(
  ".thumbnail-images-container"
);
const deleteBtn = document.querySelector(".delete-btn");
const checkoutBtnContainer = document.querySelector(".checkout-btn-container ");
const addToCartModal = document.querySelector(".modal-container2");
const addToCartModalCloseBtn = document.querySelector(".icon-close2");
const addToCartModalBtn = document.querySelector(".add-to-cart-popUp");

let count = 0;
let totalPrice = 0;

// products store
let productData = [
  {
    id: "1",
    name: "Fall Limited Edition sneaker",
    price: "125",
    desc: " These low-level sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they will withstand everything the weather can offer.",
    image: "./assets/images/image-product-1.jpg",
    thumbnails: [
      "./assets/images/image-product-1.jpg",
      "./assets/images/image-product-2.jpg",
      "./assets/images/image-product-3.jpg",
      "./assets/images/image-product-4.jpg",
    ],
  },
];
cart = [];

// display products image and thubnail function by creating new element and appending them to their various parent containers
const listProduct = () => {
  thumbnailImageContainer.innerHTML = "";

  productData.forEach((product) => {
    productImage = document.createElement("img");
    productImage.classList.add(
      "object-contain",
      "md:w-[340px]",
      "w-full",
      "rounded-xl",
      "cursor-pointer"
    );

    productImage.src = product.image;

    productImageContainer.appendChild(productImage);

    product.thumbnails.forEach((thumbnail, index) => {
      imageThumbnail = document.createElement("img");
      imageThumbnail.classList.add(
        "object-contain",
        "md:w-20",
        "w-32",
        "rounded-md",
        "cursor-pointer"
      );

      if (index === 0) {
        imageThumbnail.classList.add("active");
      }
      imageThumbnail.src = thumbnail;

      // click thumbnail to change main product image functionality
      imageThumbnail.addEventListener("click", (event) => {
        document
          .querySelectorAll(".thumbnail-images-container img")
          .forEach((img) => {
            img.classList.remove("active");
          });
        productImage.src = thumbnail;
        event.target.classList.add("active");
      });

      thumbnailImageContainer.appendChild(imageThumbnail);
      productName.innerHTML = product.name;
      productDesc.innerHTML = product.desc;
    });
  });
};
listProduct();

// increament product function
increamentBtn.addEventListener("click", () => {
  count++;
  cartQty.innerHTML = count;
});

// decreament product function
decreamentBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    cartQty.innerHTML = count;
  }
});

// add to cart function
addToCart.addEventListener("click", () => {
  if (count === 0) {
    addToCartModal.classList.remove("hide");
  } else {
    productData.forEach((product) => {
      let searchCart = cart.find((x) => x.id === product.id);
      if (searchCart) {
        cartQty.innerHTML = count;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          desc: product.desc,
          price: product.price,
          image: product.image,
        });
        function pushNotify() {
          new Notify({
            title: "Cart",
            text: "Product(s) added to Cart Sucessfully",
          });
        }
        pushNotify();
      }
    });
  }

  cartCount.innerHTML = count;
  calculatePrice();
  showItemsInCart();
  cartQty.innerHTML = 0;
});
addToCartModalCloseBtn.addEventListener("click", () => {
  addToCartModal.classList.add("hide");
});

// toggle cart icon
cartIconContainer.addEventListener("click", () => {
  cartContainer.classList.toggle("hide");
  showItemsInCart();
});

// calculate product price function

const calculatePrice = () => {
  productData.forEach((data) => {
    itemPrice.innerHTML = `<span class="price text-xl font-bold">$${data.price}.00</span>`;
    totalPrice = count * data.price;
  });
};
calculatePrice();

// display items in cart
const showItemsInCart = () => {
  if (count === 0) {
    emptyCart.innerHTML = `
      <div class="flex h-[100px] items-center justify-center">
        <p class="font-medium text-gray-400">Your cart is empty</p>
      </div>`;
    checkoutBtnContainer.classList.add("hide");
    cartItems.innerHTML = "";
  } else {
    emptyCart.innerHTML = "";
    cartItems.innerHTML = cart
      .map((item) => {
        return `
            <div class="max-w-16">
              <img class="object-cover rounded-lg" src="${item.image}" alt="" />
            </div>
            <div>
              <p>${item.name}</p>
              <p>
                <span>$${
                  item.price
                }.00</span> <span>*</span> <span>${count}</span>
                <span class="font-bold">$${totalPrice.toFixed(2)}</span>
              </p>
            </div>
             <button>
                <img class="delete-btn" src="./assets/images/icon-delete.svg" alt="" data-id="${
                  item.id
                }" />
              </button>
           `;
      })
      .join("");

    checkoutBtnContainer.classList.remove("hide");
  }
};

cartItems.addEventListener("click", (event) => {
  if (event.target.closest(".delete-btn")) {
    const id = event.target.closest(".delete-btn").dataset.id;
    cart = cart.filter((item) => item.id != id);
    count = cart.length;
    // totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartCount.innerHTML = count;
    showItemsInCart();
  }
});
// cart.filter((product) => product.id !== id);
