import Product from "./models/Product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const products = [
  {
    name: "Men's Classic Cotton T-Shirt",
    description: "Soft, breathable cotton t-shirt available in all sizes.",
    price: 499,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Women's Floral Summer Dress",
    description: "Lightweight floral dress perfect for summer outings.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  {
    name: "Kids' Cartoon Hoodie",
    description: "Cute and warm hoodie for kids with cartoon prints.",
    price: 899,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "Men’s Slim Fit Jeans",
    description: "Comfortable stretchable denim jeans.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 80,
  },
  {
    name: "Women's Handbag",
    description: "Premium handbag for everyday use.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    category: "Women",
    sizes: [],
    stock: 25,
  },
  {
    name: "Kids’ Cotton Shorts",
    description: "Soft and comfortable cotton shorts for kids.",
    price: 499,
    image: "https://images.unsplash.com/photo-1530650011780-30eec3b9b64b",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 60,
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("✨ Sample products added successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
