class ShoppingCart {
  constructor() {
    this.totalPriceElement = document.querySelector(".total");
    this.cartCountElement = document.getElementById("cart-count");
    this.initialize();
  }

  initialize() {
    // Set up event listeners for product cards
    this.setupProductCards();
    // Handle like button styling for each heart icon
    this.handleHeartIcons();
  }

  setupProductCards() {
    // Select all product cards to iterate through them
    this.productCards = document.querySelectorAll(".card");

    // Set up event listeners for each product card
    this.productCards.forEach((card) => {
      const quantityElement = card.querySelector(".quantity");
      const increaseButton = card.querySelector(".increase");
      const decreaseButton = card.querySelector(".decrease");
      const deleteButton = card.querySelector(".delete");
      const likeButton = card.querySelector(".like");

      const cartItem = new CartItem(card, quantityElement, increaseButton, decreaseButton, deleteButton, likeButton, this);
      cartItem.setupEventListeners();
    });
  }

  // Method to update the total price based on quantities and unit prices
  updateTotalPrice() {
    let totalPrice = 0;
    // Re-fetch the product cards after any change (e.g., deletion or update in quantity)
    this.productCards = document.querySelectorAll(".card");

    // If no cards are left, set the total price to 0
    if (this.productCards.length === 0) {
      totalPrice = 0;
    } else {
      this.productCards.forEach((card) => {
        const quantity = parseInt(card.querySelector(".quantity").innerText) || 0;
        const price = parseFloat(card.querySelector(".unit-price").innerText);
        totalPrice += quantity * price;
      });
    }

    // Update the total price in the UI
    this.totalPriceElement.innerText = totalPrice.toFixed(2) + " $";
  }

  // Function to update the cart count display
  updateCartCount() {
    let totalQuantity = 0;
    const quantities = document.querySelectorAll(".quantity");

    quantities.forEach((quantityElement) => {
      totalQuantity += parseInt(quantityElement.textContent);
    });

    this.cartCountElement.textContent = totalQuantity;
  }

  // Handle the heart icons
  handleHeartIcons() {
    const hearts = document.querySelectorAll(".fa-heart");
    hearts.forEach((heart) => {
      heart.addEventListener("click", () => {
        heart.classList.toggle("liked"); // Toggle the "liked" class
      });
    });
  }
}

// CartItem class to handle each product card functionality
class CartItem {
  constructor(card, quantityElement, increaseButton, decreaseButton, deleteButton, likeButton, shoppingCart) {
    this.card = card;
    this.quantityElement = quantityElement;
    this.increaseButton = increaseButton;
    this.decreaseButton = decreaseButton;
    this.deleteButton = deleteButton;
    this.likeButton = likeButton;
    this.shoppingCart = shoppingCart;
    this.quantity = parseInt(quantityElement.innerText) || 0; // Initialize quantity for each product
  }

  setupEventListeners() {
    // Event listener for increasing quantity
    this.increaseButton.addEventListener("click", () => {
      this.quantity++;
      this.updateQuantity();
      this.shoppingCart.updateTotalPrice();
    });

    // Event listener for decreasing quantity
    this.decreaseButton.addEventListener("click", () => {
      if (this.quantity > 0) {
        this.quantity--;
        this.updateQuantity();
        this.shoppingCart.updateTotalPrice();
      }
    });

    // Event listener for deleting the product card
    this.deleteButton.addEventListener("click", () => {
      // Remove the card from the DOM
      this.card.remove();

      // Update the cart count and total price after deletion
      this.shoppingCart.updateCartCount();
      this.shoppingCart.updateTotalPrice(); // This will correctly reset the price to 0 if no cards are left
    });

    // Event listener for liking/unliking the product
    this.likeButton.addEventListener("click", () => {
      this.likeButton.classList.toggle("active"); // Toggle the "active" class
    });
  }

  updateQuantity() {
    this.quantityElement.innerText = this.quantity;
    this.shoppingCart.updateCartCount(); // Update the cart count after change
  }
}

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const shoppingCart = new ShoppingCart();
});
