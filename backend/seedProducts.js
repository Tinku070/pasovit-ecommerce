import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/Product.js";

// Explicitly load .env inside backend folder
dotenv.config({ path: "./backend/.env" });

// Debugging
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, "products.json");

async function seedProducts() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Removing old products...");
    await Product.deleteMany({});

    console.log("Reading products.json...");
    const data = fs.readFileSync(productsFile, "utf8");
    const products = JSON.parse(data);

    console.log("Inserting products...");
    await Product.insertMany(products);

    console.log("Products added successfully!");
    process.exit();
  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
}

seedProducts();
