export const categories = [
  "Fruits & Vegetables",
  "Dairy",
  "Bakery & Breakfast",
  "Snacks",
  "Beverages",
  "Staples",
  "Protein",
  "Frozen & Desserts",
  "Personal Care",
  "Household"
];

export const categoryMeta = {
  "Fruits & Vegetables": { icon: "🥬", tagline: "Farm-fresh daily picks" },
  "Dairy": { icon: "🥛", tagline: "Chilled milk, eggs & cheese" },
  "Bakery & Breakfast": { icon: "🥐", tagline: "Warm bakes & morning fuel" },
  "Snacks": { icon: "🍪", tagline: "Crisps, nuts & dark treats" },
  "Beverages": { icon: "☕", tagline: "Cold brews, teas & juices" },
  "Staples": { icon: "🌾", tagline: "Grains, oils & pantry basics" },
  "Protein": { icon: "💪", tagline: "Whey, lean meat & shakes" },
  "Frozen & Desserts": { icon: "🍨", tagline: "Sorbet, tubs & quick bites" },
  "Personal Care": { icon: "🧴", tagline: "Daily skin & hair essentials" },
  "Household": { icon: "🧺", tagline: "Cleaners & home upkeep" }
};

export const defaultProducts = [
  // Fruits & Vegetables
  { id: 1, name: "Fresh Tomatoes", category: "Fruits & Vegetables", qty: "1 kg", price: 45, original: 60, rating: 4.5, emoji: "🍅", image: "/images/products/p-1.jpg", stock: 20, tag: "Fresh" },
  { id: 2, name: "Potatoes", category: "Fruits & Vegetables", qty: "1 kg", price: 30, original: 35, rating: 4.2, emoji: "🥔", image: "/images/products/p-2.jpg", stock: 3 },
  { id: 3, name: "Bananas", category: "Fruits & Vegetables", qty: "1 dozen", price: 50, original: 60, rating: 4.6, emoji: "🍌", image: "/images/products/p-3.jpg", stock: 15, tag: "Campus Fav" },
  { id: 4, name: "Apples", category: "Fruits & Vegetables", qty: "1 kg", price: 160, original: 200, rating: 4.7, emoji: "🍎", image: "/images/products/p-4.jpg", stock: 10, tag: "Bestseller" },
  { id: 5, name: "Broccoli", category: "Fruits & Vegetables", qty: "500 g", price: 55, original: 70, rating: 4.1, emoji: "🥦", image: "/images/products/p-5.jpg", stock: 0 },
  { id: 20, name: "Fresh Spinach", category: "Fruits & Vegetables", qty: "250 g", price: 35, original: 45, rating: 4.6, emoji: "🥬", image: "/images/products/p-20.jpg", stock: 18, tag: "Organic" },
  { id: 21, name: "Red Onions", category: "Fruits & Vegetables", qty: "1 kg", price: 40, original: 50, rating: 4.4, emoji: "🧅", image: "/images/products/p-21.jpg", stock: 28 },
  { id: 22, name: "Hass Avocados", category: "Fruits & Vegetables", qty: "2 pcs", price: 140, original: 180, rating: 4.8, emoji: "🥑", image: "/images/products/p-22.jpg", stock: 9, tag: "Imported" },
  { id: 23, name: "Fresh Strawberries", category: "Fruits & Vegetables", qty: "200 g", price: 120, original: 150, rating: 4.7, emoji: "🍓", image: "/images/products/p-23.jpg", stock: 12 },
  { id: 46, name: "Fresh Blueberries", category: "Fruits & Vegetables", qty: "125 g", price: 185, original: 230, rating: 4.8, emoji: "🫐", image: "/images/products/p-46.jpg", stock: 10, tag: "New" },
  { id: 47, name: "Baby Carrots", category: "Fruits & Vegetables", qty: "500 g", price: 45, original: 58, rating: 4.5, emoji: "🥕", image: "/images/products/p-47.jpg", stock: 22 },
  { id: 48, name: "Sweet Corn Cobs", category: "Fruits & Vegetables", qty: "2 pcs", price: 40, original: 50, rating: 4.4, emoji: "🌽", image: "/images/products/p-48.jpg", stock: 16 },
  { id: 49, name: "Alphonso Mangoes", category: "Fruits & Vegetables", qty: "1 kg", price: 240, original: 290, rating: 4.9, emoji: "🥭", image: "/images/products/p-49.jpg", stock: 14, tag: "Bestseller" },
  { id: 76, name: "Bell Peppers (Red & Yellow)", category: "Fruits & Vegetables", qty: "500 g", price: 85, original: 110, rating: 4.6, emoji: "🫑", image: "/images/products/p-76.jpg", stock: 16, tag: "Fresh" },
  { id: 77, name: "Seedless Green Grapes", category: "Fruits & Vegetables", qty: "500 g", price: 95, original: 120, rating: 4.7, emoji: "🍇", image: "/images/products/p-77.jpg", stock: 19, tag: "Sweet" },
  { id: 78, name: "Fresh Garlic Bulbs", category: "Fruits & Vegetables", qty: "250 g", price: 45, original: 60, rating: 4.5, emoji: "🧄", image: "/images/products/p-78.jpg", stock: 25 },
  { id: 79, name: "English Cucumber", category: "Fruits & Vegetables", qty: "500 g", price: 35, original: 45, rating: 4.5, emoji: "🥒", image: "/images/products/p-79.jpg", stock: 22 },

  // Dairy
  { id: 6, name: "Toned Milk", category: "Dairy", qty: "1 L", price: 58, original: 62, rating: 4.6, emoji: "🥛", image: "/images/products/p-6.jpg", stock: 25, tag: "Daily Fresh" },
  { id: 7, name: "Farm Eggs", category: "Dairy", qty: "6 pcs", price: 48, original: 55, rating: 4.5, emoji: "🥚", image: "/images/products/p-7.jpg", stock: 12 },
  { id: 8, name: "Paneer", category: "Dairy", qty: "200 g", price: 85, original: 100, rating: 4.4, emoji: "🧀", image: "/images/products/p-8.jpg", stock: 2 },
  { id: 24, name: "Greek Yogurt", category: "Dairy", qty: "400 g", price: 95, original: 115, rating: 4.7, emoji: "🍨", image: "/images/products/p-24.jpg", stock: 14, tag: "High Protein" },
  { id: 25, name: "Salted Butter", category: "Dairy", qty: "100 g", price: 56, original: 62, rating: 4.6, emoji: "🧈", image: "/images/products/p-25.jpg", stock: 20 },
  { id: 26, name: "Cheddar Cheese Slices", category: "Dairy", qty: "200 g", price: 130, original: 155, rating: 4.5, emoji: "🧀", image: "/images/products/p-26.jpg", stock: 15 },
  { id: 50, name: "Mozzarella Block", category: "Dairy", qty: "200 g", price: 135, original: 165, rating: 4.6, emoji: "🧀", image: "/images/products/p-50.jpg", stock: 11 },
  { id: 51, name: "Probiotic Curd", category: "Dairy", qty: "400 g", price: 42, original: 50, rating: 4.5, emoji: "🥣", image: "/images/products/p-51.jpg", stock: 24 },
  { id: 52, name: "Unsweetened Almond Milk", category: "Dairy", qty: "1 L", price: 195, original: 240, rating: 4.7, emoji: "🥛", image: "/images/products/p-52.jpg", stock: 9, tag: "Vegan" },
  { id: 80, name: "Pure Desi Cow Ghee", category: "Dairy", qty: "500 ml", price: 340, original: 395, rating: 4.9, emoji: "🧈", image: "/images/products/p-80.jpg", stock: 12, tag: "Bestseller" },
  { id: 81, name: "Fresh Cream (25% Fat)", category: "Dairy", qty: "250 ml", price: 68, original: 80, rating: 4.6, emoji: "🥛", image: "/images/products/p-81.jpg", stock: 16 },
  { id: 82, name: "Parmesan Grated Cheese", category: "Dairy", qty: "100 g", price: 175, original: 210, rating: 4.7, emoji: "🧀", image: "/images/products/p-82.jpg", stock: 10, tag: "Imported" },
  { id: 83, name: "Cold Coffee Milk Bottle", category: "Dairy", qty: "200 ml", price: 45, original: 55, rating: 4.6, emoji: "☕", image: "/images/products/p-83.jpg", stock: 24, tag: "Campus Fav" },

  // Bakery & Breakfast
  { id: 9, name: "Brown Bread", category: "Bakery & Breakfast", qty: "400 g", price: 42, original: 50, rating: 4.3, emoji: "🍞", image: "/images/products/p-9.jpg", stock: 18 },
  { id: 53, name: "Butter Croissants", category: "Bakery & Breakfast", qty: "2 pcs", price: 110, original: 135, rating: 4.8, emoji: "🥐", image: "/images/products/p-53.jpg", stock: 12, tag: "Fresh Bake" },
  { id: 54, name: "Blueberry Muffins", category: "Bakery & Breakfast", qty: "2 pcs", price: 95, original: 120, rating: 4.6, emoji: "🧁", image: "/images/products/p-54.jpg", stock: 15, tag: "Campus Fav" },
  { id: 55, name: "Belgian Waffle Mix", category: "Bakery & Breakfast", qty: "400 g", price: 175, original: 210, rating: 4.5, emoji: "🧇", image: "/images/products/p-55.jpg", stock: 10 },
  { id: 56, name: "Brioche Burger Buns", category: "Bakery & Breakfast", qty: "4 pcs", price: 70, original: 85, rating: 4.4, emoji: "🍔", image: "/images/products/p-56.jpg", stock: 14 },
  { id: 84, name: "Sourdough Artisan Loaf", category: "Bakery & Breakfast", qty: "450 g", price: 145, original: 175, rating: 4.8, emoji: "🍞", image: "/images/products/p-84.jpg", stock: 10, tag: "Fresh Bake" },
  { id: 85, name: "Cinnamon Swirl Rolls", category: "Bakery & Breakfast", qty: "2 pcs", price: 120, original: 150, rating: 4.7, emoji: "🥐", image: "/images/products/p-85.jpg", stock: 14 },
  { id: 86, name: "Multigrain Bagels", category: "Bakery & Breakfast", qty: "4 pcs", price: 130, original: 160, rating: 4.5, emoji: "🥯", image: "/images/products/p-86.jpg", stock: 12 },
  { id: 87, name: "Maple & Almond Granola", category: "Bakery & Breakfast", qty: "400 g", price: 245, original: 290, rating: 4.7, emoji: "🥣", image: "/images/products/p-87.jpg", stock: 15, tag: "New" },

  // Snacks
  { id: 12, name: "Digestive Biscuits", category: "Snacks", qty: "250 g", price: 35, original: 40, rating: 4.4, emoji: "🍪", image: "/images/products/p-12.jpg", stock: 30 },
  { id: 13, name: "Potato Chips", category: "Snacks", qty: "150 g", price: 30, original: 35, rating: 4.2, emoji: "🍟", image: "/images/products/p-13.jpg", stock: 22 },
  { id: 27, name: "Roasted Almonds", category: "Snacks", qty: "200 g", price: 220, original: 260, rating: 4.8, emoji: "🌰", image: "/images/products/p-27.jpg", stock: 16, tag: "Bestseller" },
  { id: 28, name: "Dark Chocolate Bar", category: "Snacks", qty: "100 g", price: 110, original: 135, rating: 4.7, emoji: "🍫", image: "/images/products/p-28.jpg", stock: 24 },
  { id: 29, name: "Masala Makhana", category: "Snacks", qty: "80 g", price: 75, original: 95, rating: 4.5, emoji: "🍿", image: "/images/products/p-29.jpg", stock: 19, tag: "Campus Fav" },
  { id: 57, name: "Berry & Nut Trail Mix", category: "Snacks", qty: "200 g", price: 245, original: 295, rating: 4.8, emoji: "🥜", image: "/images/products/p-57.jpg", stock: 13, tag: "New" },
  { id: 58, name: "Baked Corn Nachos", category: "Snacks", qty: "150 g", price: 65, original: 80, rating: 4.4, emoji: "🌮", image: "/images/products/p-58.jpg", stock: 21 },
  { id: 59, name: "Protein Granola Bars", category: "Snacks", qty: "4 pack", price: 160, original: 195, rating: 4.6, emoji: "🍫", image: "/images/products/p-59.jpg", stock: 18 },
  { id: 88, name: "Salted Roasted Cashews", category: "Snacks", qty: "200 g", price: 265, original: 320, rating: 4.8, emoji: "🥜", image: "/images/products/p-88.jpg", stock: 14, tag: "Bestseller" },
  { id: 89, name: "Pistachios Roasted & Salted", category: "Snacks", qty: "150 g", price: 240, original: 285, rating: 4.8, emoji: "🌰", image: "/images/products/p-89.jpg", stock: 12 },
  { id: 90, name: "Butter Caramel Popcorn", category: "Snacks", qty: "90 g", price: 65, original: 80, rating: 4.6, emoji: "🍿", image: "/images/products/p-90.jpg", stock: 24, tag: "Campus Fav" },
  { id: 91, name: "Sea Salt Pretzel Twists", category: "Snacks", qty: "150 g", price: 95, original: 115, rating: 4.4, emoji: "🥨", image: "/images/products/p-91.jpg", stock: 18 },

  // Beverages
  { id: 14, name: "Orange Juice", category: "Beverages", qty: "1 L", price: 110, original: 130, rating: 4.5, emoji: "🧃", image: "/images/products/p-14.jpg", stock: 9 },
  { id: 30, name: "Cold Brew Coffee", category: "Beverages", qty: "250 ml", price: 90, original: 110, rating: 4.6, emoji: "☕", image: "/images/products/p-30.jpg", stock: 16, tag: "Campus Fav" },
  { id: 31, name: "Classic Green Tea", category: "Beverages", qty: "25 bags", price: 145, original: 175, rating: 4.5, emoji: "🍵", image: "/images/products/p-31.jpg", stock: 14 },
  { id: 32, name: "Tender Coconut Water", category: "Beverages", qty: "1 L", price: 95, original: 115, rating: 4.7, emoji: "🥥", image: "/images/products/p-32.jpg", stock: 22, tag: "Bestseller" },
  { id: 33, name: "Sparkling Mineral Water", category: "Beverages", qty: "750 ml", price: 60, original: 75, rating: 4.4, emoji: "💧", image: "/images/products/p-33.jpg", stock: 30 },
  { id: 60, name: "Matcha Iced Latte", category: "Beverages", qty: "200 ml", price: 125, original: 150, rating: 4.7, emoji: "🍵", image: "/images/products/p-60.jpg", stock: 12, tag: "New" },
  { id: 61, name: "Cold-Pressed Pomegranate Juice", category: "Beverages", qty: "1 L", price: 165, original: 199, rating: 4.8, emoji: "🧃", image: "/images/products/p-61.jpg", stock: 11 },
  { id: 62, name: "Electrolyte Hydration Drink", category: "Beverages", qty: "500 ml", price: 55, original: 65, rating: 4.5, emoji: "🥤", image: "/images/products/p-62.jpg", stock: 26 },
  { id: 92, name: "Sparkling Peach Iced Tea", category: "Beverages", qty: "330 ml", price: 70, original: 85, rating: 4.6, emoji: "🍑", image: "/images/products/p-92.jpg", stock: 20, tag: "New" },
  { id: 93, name: "Filter Coffee Decoction", category: "Beverages", qty: "200 ml", price: 135, original: 160, rating: 4.8, emoji: "☕", image: "/images/products/p-93.jpg", stock: 15, tag: "South Indian" },
  { id: 94, name: "Fresh Mint Lemonade", category: "Beverages", qty: "300 ml", price: 55, original: 70, rating: 4.7, emoji: "🍋", image: "/images/products/p-94.jpg", stock: 25 },
  { id: 95, name: "Spiced Masala Chai Pack", category: "Beverages", qty: "250 g", price: 160, original: 190, rating: 4.8, emoji: "🍵", image: "/images/products/p-95.jpg", stock: 18, tag: "Bestseller" },

  // Staples
  { id: 10, name: "Basmati Rice", category: "Staples", qty: "5 kg", price: 425, original: 500, rating: 4.7, emoji: "🍚", image: "/images/products/p-10.jpg", stock: 8, tag: "Bestseller" },
  { id: 11, name: "Cooking Oil", category: "Staples", qty: "1 L", price: 145, original: 165, rating: 4.3, emoji: "🫙", image: "/images/products/p-11.jpg", stock: 14 },
  { id: 34, name: "Whole Wheat Atta", category: "Staples", qty: "5 kg", price: 240, original: 280, rating: 4.6, emoji: "🌾", image: "/images/products/p-34.jpg", stock: 15 },
  { id: 35, name: "Rolled Oats", category: "Staples", qty: "1 kg", price: 175, original: 210, rating: 4.7, emoji: "🥣", image: "/images/products/p-35.jpg", stock: 18 },
  { id: 36, name: "Toor Dal", category: "Staples", qty: "1 kg", price: 155, original: 185, rating: 4.5, emoji: "🫘", image: "/images/products/p-36.jpg", stock: 20 },
  { id: 37, name: "Organic Wild Honey", category: "Staples", qty: "250 g", price: 180, original: 220, rating: 4.8, emoji: "🍯", image: "/images/products/p-37.jpg", stock: 11, tag: "Organic" },
  { id: 63, name: "Extra Virgin Olive Oil", category: "Staples", qty: "500 ml", price: 465, original: 550, rating: 4.8, emoji: "🫒", image: "/images/products/p-63.jpg", stock: 9, tag: "Cold Pressed" },
  { id: 64, name: "Organic Quinoa Grains", category: "Staples", qty: "500 g", price: 190, original: 230, rating: 4.6, emoji: "🌾", image: "/images/products/p-64.jpg", stock: 14 },
  { id: 65, name: "Pink Himalayan Salt", category: "Staples", qty: "1 kg", price: 95, original: 120, rating: 4.5, emoji: "🧂", image: "/images/products/p-65.jpg", stock: 22 },
  { id: 96, name: "Kashmiri Saffron Strands", category: "Staples", qty: "1 g", price: 295, original: 360, rating: 4.9, emoji: "🌺", image: "/images/products/p-96.jpg", stock: 8, tag: "Premium" },
  { id: 97, name: "Whole Black Peppercorns", category: "Staples", qty: "100 g", price: 115, original: 140, rating: 4.7, emoji: "⚫", image: "/images/products/p-97.jpg", stock: 19 },
  { id: 98, name: "Organic Chia Seeds", category: "Staples", qty: "250 g", price: 165, original: 200, rating: 4.8, emoji: "🌱", image: "/images/products/p-98.jpg", stock: 16, tag: "Superfood" },
  { id: 99, name: "Italian Penne Pasta", category: "Staples", qty: "500 g", price: 125, original: 150, rating: 4.6, emoji: "🍝", image: "/images/products/p-99.jpg", stock: 21 },

  // Protein
  { id: 17, name: "Chicken Breast", category: "Protein", qty: "500 g", price: 250, original: 300, rating: 4.5, emoji: "🍗", image: "/images/products/p-17.jpg", stock: 7 },
  { id: 18, name: "Protein Powder", category: "Protein", qty: "1 kg", price: 1035, original: 1200, rating: 4.3, emoji: "🥤", image: "/images/products/p-18.jpg", stock: 11 },
  { id: 19, name: "Whey Protein", category: "Protein", qty: "1 kg", price: 1135, original: 1400, rating: 4.8, emoji: "💪", image: "/images/products/p-19.jpg", stock: 11, tag: "Bestseller" },
  { id: 44, name: "Crunchy Peanut Butter", category: "Protein", qty: "500 g", price: 210, original: 255, rating: 4.7, emoji: "🥜", image: "/images/products/p-44.jpg", stock: 17, tag: "High Protein" },
  { id: 45, name: "High-Protein Soya Chunks", category: "Protein", qty: "400 g", price: 65, original: 80, rating: 4.4, emoji: "🫛", image: "/images/products/p-45.jpg", stock: 24 },
  { id: 66, name: "Belgian Choco Protein Shake", category: "Protein", qty: "330 ml", price: 110, original: 130, rating: 4.7, emoji: "🥤", image: "/images/products/p-66.jpg", stock: 20, tag: "New" },
  { id: 67, name: "Roasted Chickpea Crunch", category: "Protein", qty: "150 g", price: 85, original: 105, rating: 4.5, emoji: "🫛", image: "/images/products/p-67.jpg", stock: 16 },
  { id: 100, name: "Fresh Atlantic Salmon Fillet", category: "Protein", qty: "250 g", price: 460, original: 540, rating: 4.8, emoji: "🐟", image: "/images/products/p-100.jpg", stock: 8, tag: "Fresh Catch" },
  { id: 101, name: "Smoked Tofu Block", category: "Protein", qty: "200 g", price: 110, original: 135, rating: 4.5, emoji: "🧈", image: "/images/products/p-101.jpg", stock: 14, tag: "Vegan" },
  { id: 102, name: "Egg White Protein Carton", category: "Protein", qty: "500 ml", price: 185, original: 220, rating: 4.6, emoji: "🥚", image: "/images/products/p-102.jpg", stock: 13 },
  { id: 103, name: "Pumpkin & Sunflower Seeds", category: "Protein", qty: "200 g", price: 175, original: 215, rating: 4.7, emoji: "🌻", image: "/images/products/p-103.jpg", stock: 17, tag: "High Protein" },

  // Frozen & Desserts
  { id: 68, name: "Belgian Dark Chocolate Tub", category: "Frozen & Desserts", qty: "500 ml", price: 260, original: 310, rating: 4.9, emoji: "🍨", image: "/images/products/p-68.jpg", stock: 10, tag: "Bestseller" },
  { id: 69, name: "Alphonso Mango Sorbet Pops", category: "Frozen & Desserts", qty: "4 pcs", price: 140, original: 170, rating: 4.7, emoji: "🍧", image: "/images/products/p-69.jpg", stock: 14, tag: "New" },
  { id: 70, name: "Crispy Veggie Nuggets", category: "Frozen & Desserts", qty: "400 g", price: 185, original: 225, rating: 4.5, emoji: "🧆", image: "/images/products/p-70.jpg", stock: 12 },
  { id: 71, name: "Sweet Green Peas", category: "Frozen & Desserts", qty: "500 g", price: 85, original: 105, rating: 4.4, emoji: "🫛", image: "/images/products/p-71.jpg", stock: 19 },
  { id: 104, name: "Madagascar Vanilla Ice Cream", category: "Frozen & Desserts", qty: "500 ml", price: 225, original: 270, rating: 4.8, emoji: "🍨", image: "/images/products/p-104.jpg", stock: 12 },
  { id: 105, name: "Frozen Mixed Berries", category: "Frozen & Desserts", qty: "300 g", price: 210, original: 250, rating: 4.7, emoji: "🫐", image: "/images/products/p-105.jpg", stock: 15, tag: "Smoothie Ready" },
  { id: 106, name: "Crispy French Fries Pack", category: "Frozen & Desserts", qty: "500 g", price: 135, original: 165, rating: 4.6, emoji: "🍟", image: "/images/products/p-106.jpg", stock: 22, tag: "Campus Fav" },
  { id: 107, name: "Tiramisu Dessert Cup", category: "Frozen & Desserts", qty: "150 g", price: 165, original: 195, rating: 4.8, emoji: "🍰", image: "/images/products/p-107.jpg", stock: 11, tag: "New" },

  // Personal Care
  { id: 15, name: "Herbal Shampoo", category: "Personal Care", qty: "340 ml", price: 210, original: 250, rating: 4.6, emoji: "🧴", image: "/images/products/p-15.jpg", stock: 6 },
  { id: 38, name: "Moisturizing Body Wash", category: "Personal Care", qty: "250 ml", price: 195, original: 240, rating: 4.5, emoji: "🫧", image: "/images/products/p-38.jpg", stock: 14 },
  { id: 39, name: "Mint Fresh Toothpaste", category: "Personal Care", qty: "150 g", price: 85, original: 100, rating: 4.4, emoji: "🪥", image: "/images/products/p-39.jpg", stock: 25 },
  { id: 40, name: "Aloe Vera Face Wash", category: "Personal Care", qty: "100 ml", price: 149, original: 180, rating: 4.6, emoji: "🧼", image: "/images/products/p-40.jpg", stock: 13 },
  { id: 72, name: "SPF 50 Gel Sunscreen", category: "Personal Care", qty: "50 ml", price: 295, original: 360, rating: 4.8, emoji: "☀️", image: "/images/products/p-72.jpg", stock: 11, tag: "Bestseller" },
  { id: 73, name: "Berry Hydrating Lip Balm", category: "Personal Care", qty: "4.5 g", price: 120, original: 145, rating: 4.5, emoji: "💄", image: "/images/products/p-73.jpg", stock: 18 },
  { id: 108, name: "Charcoal Detox Face Scrub", category: "Personal Care", qty: "100 g", price: 185, original: 225, rating: 4.6, emoji: "🧼", image: "/images/products/p-108.jpg", stock: 14 },
  { id: 109, name: "Shea Butter Hand Cream", category: "Personal Care", qty: "75 ml", price: 155, original: 190, rating: 4.7, emoji: "🧴", image: "/images/products/p-109.jpg", stock: 16 },
  { id: 110, name: "Rosewater Facial Mist", category: "Personal Care", qty: "100 ml", price: 140, original: 175, rating: 4.6, emoji: "🌹", image: "/images/products/p-110.jpg", stock: 13, tag: "Refreshing" },
  { id: 111, name: "Coconut Hair Serum", category: "Personal Care", qty: "100 ml", price: 220, original: 265, rating: 4.7, emoji: "🥥", image: "/images/products/p-111.jpg", stock: 12 },

  // Household
  { id: 16, name: "Laundry Detergent", category: "Household", qty: "1 kg", price: 135, original: 160, rating: 4.3, emoji: "🧺", image: "/images/products/p-16.jpg", stock: 11 },
  { id: 41, name: "Lemon Dishwash Gel", category: "Household", qty: "500 ml", price: 105, original: 125, rating: 4.5, emoji: "🧽", image: "/images/products/p-41.jpg", stock: 19 },
  { id: 42, name: "Soft Paper Towels", category: "Household", qty: "2 rolls", price: 120, original: 145, rating: 4.4, emoji: "🧻", image: "/images/products/p-42.jpg", stock: 16 },
  { id: 43, name: "Pine Surface Cleaner", category: "Household", qty: "1 L", price: 165, original: 199, rating: 4.6, emoji: "🧹", image: "/images/products/p-43.jpg", stock: 12 },
  { id: 74, name: "Lavender Fabric Conditioner", category: "Household", qty: "850 ml", price: 210, original: 250, rating: 4.7, emoji: "🌸", image: "/images/products/p-74.jpg", stock: 14, tag: "New" },
  { id: 75, name: "Microfiber Cleaning Cloths", category: "Household", qty: "3 pcs", price: 149, original: 180, rating: 4.6, emoji: "🧽", image: "/images/products/p-75.jpg", stock: 20 },
  { id: 112, name: "Bamboo Kitchen Sponges", category: "Household", qty: "4 pcs", price: 115, original: 140, rating: 4.5, emoji: "🧽", image: "/images/products/p-112.jpg", stock: 22, tag: "Eco" },
  { id: 113, name: "Lemongrass Room Spray", category: "Household", qty: "200 ml", price: 175, original: 210, rating: 4.6, emoji: "🌿", image: "/images/products/p-113.jpg", stock: 15 },
  { id: 114, name: "Heavy-Duty Trash Bags", category: "Household", qty: "30 pcs", price: 125, original: 150, rating: 4.5, emoji: "🗑️", image: "/images/products/p-114.jpg", stock: 24 },
  { id: 115, name: "Stainless Steel Scrubber", category: "Household", qty: "3 pcs", price: 75, original: 95, rating: 4.4, emoji: "✨", image: "/images/products/p-115.jpg", stock: 28 }
];

export const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const money = value => `₹${Number(value || 0).toLocaleString("en-IN")}`;
