const modalContainer = document.querySelector(".modal-container");
const popUpThumbnailContainer = document.querySelector(".popUpThumb-container");
const popUpImageContainer = document.querySelector(
  ".popUp-product-image-container"
);
const closeIcon = document.querySelector(".icon-close");
const previousIcon = document.querySelector(".previuos-icon");
const nextIcon = document.querySelector(".next-icon");
const mobileCloseIcon = document.querySelector(".close-btn");
const hamburgerIcon = document.querySelector(".hamburger-menu");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");

productImage.addEventListener("click", () => {
  modalContainer.classList.remove("hide");
});
closeIcon.addEventListener("click", () => {
  modalContainer.classList.add("hide");
});
mobileCloseIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.add("hide");
});
hamburgerIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.remove("hide");
});

let currentThumbnailIndex = 0;
const showPopUpModal = () => {
  productData.forEach((product) => {
    popUpImage = document.createElement("img");
    popUpImage.classList.add(
      "object-contain",
      "md:w-[340px]",
      "w-full",
      "rounded-xl",
      "cursor-pointer"
    );

    popUpImage.src = product.image;
    popUpImageContainer.appendChild(popUpImage);

    product.thumbnails.forEach((thumbnail, index) => {
      popUpimageThumbnail = document.createElement("img");
      popUpimageThumbnail.classList.add(
        "object-contain",
        "md:w-20",
        "w-32",
        "rounded-md",
        "cursor-pointer"
      );
      if (index === currentThumbnailIndex) {
        popUpimageThumbnail.classList.add("active");
      }

      popUpimageThumbnail.src = thumbnail;

      // click thumbnail to change main product image functionality
      popUpimageThumbnail.addEventListener("click", changeImage);
      function changeImage() {
        currentThumbnailIndex = index;
        document
          .querySelectorAll(".popUpThumb-container img")
          .forEach((img, index) => {
            if (index === currentThumbnailIndex) {
              img.classList.add("active");
            } else {
              img.classList.remove("active");
            }
          });
        popUpImage.src = thumbnail;
      }
      popUpThumbnailContainer.appendChild(popUpimageThumbnail);
    });
    nextIcon.addEventListener("click", () => {
      currentThumbnailIndex =
        (currentThumbnailIndex + 1) % product.thumbnails.length;
      popUpImage.src = product.thumbnails[currentThumbnailIndex];
      document
        .querySelectorAll(".popUpThumb-container img")
        .forEach((img, index) => {
          if (index === currentThumbnailIndex) {
            img.classList.add("active");
          } else {
            img.classList.remove("active");
          }
        });
    });

    previousIcon.addEventListener("click", () => {
      currentThumbnailIndex =
        (currentThumbnailIndex - 1 + product.thumbnails.length) %
        product.thumbnails.length;
      popUpImage.src = product.thumbnails[currentThumbnailIndex];
      document
        .querySelectorAll(".popUpThumb-container img")
        .forEach((img, index) => {
          if (index === currentThumbnailIndex) {
            img.classList.add("active");
          } else {
            img.classList.remove("active");
          }
        });
    });
  });
};
showPopUpModal();
