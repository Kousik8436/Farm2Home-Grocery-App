// Script to add variety of grocery products to your database
// Run this script with: node add-variety-products.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

const varietyProducts = [
  // More Vegetables
  {
    name: "Broccoli 500g",
    description: ["Rich in vitamins", "Great for steaming", "Healthy green vegetable"],
    price: 45,
    offerPrice: 40,
    category: "Vegetables"
  },
  {
    name: "Bell Pepper 250g",
    description: ["Colorful and crunchy", "Perfect for salads", "Rich in Vitamin C"],
    price: 35,
    offerPrice: 30,
    category: "Vegetables"
  },
  {
    name: "Cauliflower 1kg",
    description: ["Fresh and white", "Great for curries", "Low in calories"],
    price: 40,
    offerPrice: 35,
    category: "Vegetables"
  },
  {
    name: "Green Beans 500g",
    description: ["Tender and fresh", "Rich in fiber", "Perfect for stir-fry"],
    price: 30,
    offerPrice: 25,
    category: "Vegetables"
  },
  {
    name: "Cucumber 500g",
    description: ["Fresh and crisp", "Great for salads", "High water content"],
    price: 20,
    offerPrice: 18,
    category: "Vegetables"
  },

  // More Fruits
  {
    name: "Pineapple 1 piece",
    description: ["Sweet and juicy", "Rich in enzymes", "Perfect for desserts"],
    price: 80,
    offerPrice: 75,
    category: "Fruits"
  },
  {
    name: "Watermelon 2kg",
    description: ["Refreshing and sweet", "High water content", "Perfect for summer"],
    price: 60,
    offerPrice: 55,
    category: "Fruits"
  },
  {
    name: "Pomegranate 500g",
    description: ["Rich in antioxidants", "Sweet and tangy", "Great for health"],
    price: 120,
    offerPrice: 110,
    category: "Fruits"
  },
  {
    name: "Kiwi 250g",
    description: ["Rich in Vitamin C", "Sweet and tangy", "Exotic fruit"],
    price: 150,
    offerPrice: 140,
    category: "Fruits"
  },
  {
    name: "Papaya 1kg",
    description: ["Sweet and soft", "Good for digestion", "Rich in vitamins"],
    price: 40,
    offerPrice: 35,
    category: "Fruits"
  },

  // More Dairy Products
  {
    name: "Greek Yogurt 200g",
    description: ["Thick and creamy", "High in protein", "Probiotic benefits"],
    price: 80,
    offerPrice: 75,
    category: "Dairy"
  },
  {
    name: "Butter 100g",
    description: ["Fresh and creamy", "Perfect for cooking", "Rich taste"],
    price: 60,
    offerPrice: 55,
    category: "Dairy"
  },
  {
    name: "Cottage Cheese 200g",
    description: ["Low fat option", "High in protein", "Great for salads"],
    price: 70,
    offerPrice: 65,
    category: "Dairy"
  },
  {
    name: "Cream 200ml",
    description: ["Rich and thick", "Perfect for desserts", "Premium quality"],
    price: 90,
    offerPrice: 85,
    category: "Dairy"
  },

  // More Drinks
  {
    name: "Fresh Orange Juice 1L",
    description: ["100% natural", "No added sugar", "Rich in Vitamin C"],
    price: 120,
    offerPrice: 110,
    category: "Drinks"
  },
  {
    name: "Coconut Water 500ml",
    description: ["Natural electrolytes", "Refreshing taste", "Healthy hydration"],
    price: 45,
    offerPrice: 40,
    category: "Drinks"
  },
  {
    name: "Green Tea 100g",
    description: ["Antioxidant rich", "Healthy beverage", "Premium quality"],
    price: 200,
    offerPrice: 180,
    category: "Drinks"
  },
  {
    name: "Energy Drink 250ml",
    description: ["Instant energy boost", "Refreshing taste", "Perfect for workouts"],
    price: 50,
    offerPrice: 45,
    category: "Drinks"
  },

  // More Grains & Cereals
  {
    name: "Oats 1kg",
    description: ["High in fiber", "Heart healthy", "Perfect for breakfast"],
    price: 180,
    offerPrice: 170,
    category: "Grains"
  },
  {
    name: "Cornflakes 500g",
    description: ["Crispy and crunchy", "Fortified with vitamins", "Quick breakfast"],
    price: 150,
    offerPrice: 140,
    category: "Grains"
  },
  {
    name: "Muesli 500g",
    description: ["Mixed grains and fruits", "Healthy breakfast option", "No added sugar"],
    price: 250,
    offerPrice: 230,
    category: "Grains"
  },
  {
    name: "Semolina 1kg",
    description: ["Fine quality", "Perfect for upma", "Versatile ingredient"],
    price: 80,
    offerPrice: 75,
    category: "Grains"
  },

  // More Bakery Items
  {
    name: "Bagels 4 pieces",
    description: ["Soft and chewy", "Perfect for breakfast", "Freshly baked"],
    price: 80,
    offerPrice: 75,
    category: "Bakery"
  },
  {
    name: "Donuts 6 pieces",
    description: ["Sweet and glazed", "Perfect treat", "Freshly made"],
    price: 120,
    offerPrice: 110,
    category: "Bakery"
  },
  {
    name: "Pizza Base 2 pieces",
    description: ["Ready to use", "Thin crust", "Perfect for homemade pizza"],
    price: 60,
    offerPrice: 55,
    category: "Bakery"
  },
  {
    name: "Garlic Bread 200g",
    description: ["Crispy and flavorful", "Ready to bake", "Perfect side dish"],
    price: 90,
    offerPrice: 85,
    category: "Bakery"
  },

  // More Instant Foods
  {
    name: "Instant Pasta 500g",
    description: ["Quick cooking", "Delicious taste", "Perfect for busy days"],
    price: 80,
    offerPrice: 75,
    category: "Instant"
  },
  {
    name: "Ready to Eat Curry 300g",
    description: ["Just heat and eat", "Authentic taste", "No preservatives"],
    price: 120,
    offerPrice: 110,
    category: "Instant"
  },
  {
    name: "Instant Idli Mix 500g",
    description: ["Traditional taste", "Easy to prepare", "Healthy breakfast"],
    price: 90,
    offerPrice: 85,
    category: "Instant"
  },
  {
    name: "Popcorn 200g",
    description: ["Ready to eat", "Crunchy snack", "Perfect for movies"],
    price: 60,
    offerPrice: 55,
    category: "Instant"
  }
];

async function addProducts() {
  console.log('Starting to add variety products...');
  
  for (let i = 0; i < varietyProducts.length; i++) {
    const product = varietyProducts[i];
    
    try {
      // Create FormData for each product
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description.join(','));
      formData.append('price', product.price);
      formData.append('offerPrice', product.offerPrice);
      formData.append('category', product.category);
      
      // Add a placeholder image (you can replace with actual images)
      const response = await fetch('https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=' + encodeURIComponent(product.name.split(' ')[0]));
      const blob = await response.blob();
      const file = new File([blob], `${product.name.replace(/\s+/g, '_').toLowerCase()}.png`, { type: 'image/png' });
      formData.append('image', file);
      
      // Send to your API
      const result = await axios.post(`${API_URL}/api/product/add-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (result.data.success) {
        console.log(`✅ Added: ${product.name}`);
      } else {
        console.log(`❌ Failed to add: ${product.name}`);
      }
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`❌ Error adding ${product.name}:`, error.message);
    }
  }
  
  console.log('Finished adding products!');
}

// Run the script
addProducts();