import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get product by ID
router.get("/:id", getProductById);

// ⭐ SEED ROUTE — insert demo products
router.get("/seed/products", async (req, res) => {
  try {
    await Product.deleteMany(); // optional: removes old products

    const products = [
      {
        "name": "Men's Cotton T-Shirt",
        "description": "Soft, breathable cotton t-shirt for everyday wear.",
        "price": 499,
        "category": "Men",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1523381210434-271ae81f06d3",
        "stock": 15
      },
      {
        "name": "Men's Denim Jacket",
        "description": "Classic denim jacket with durable stitching.",
        "price": 1499,
        "category": "Men",
        "sizes": ["M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "stock": 10
      },
      {
        "name": "Men's Slim Fit Jeans",
        "description": "Comfortable stretch slim fit denim jeans.",
        "price": 1299,
        "category": "Men",
        "sizes": ["30", "32", "34", "36"],
        "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        "stock": 18
      },
      {
        "name": "Men's Hoodie",
        "description": "Warm and stylish hoodie for winter season.",
        "price": 899,
        "category": "Men",
        "sizes": ["M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        "stock": 20
      },
      {
        "name": "Men's Sports Joggers",
        "description": "Lightweight joggers perfect for workouts and casual wear.",
        "price": 799,
        "category": "Men",
        "sizes": ["M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "stock": 25
      },
      {
        "name": "Women's Floral Summer Dress",
        "description": "Lightweight floral dress perfect for summer outings.",
        "price": 1299,
        "category": "Women",
        "sizes": ["S", "M", "L"],
        "image": "https://images.unsplash.com/photo-1520975918318-3ce69a4f3b95",
        "stock": 12
      },
      {
        "name": "Women's Classic Jeans",
        "description": "High-waisted women's stretchable denim jeans.",
        "price": 1199,
        "category": "Women",
        "sizes": ["28", "30", "32"],
        "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        "stock": 22
      },
      {
        "name": "Women's Winter Jacket",
        "description": "Thick fur-lined jacket perfect for winter season.",
        "price": 1999,
        "category": "Women",
        "sizes": ["M", "L"],
        "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        "stock": 8
      },
      {
        "name": "Women's Hoodie",
        "description": "Soft fleece hoodie for comfort and warmth.",
        "price": 799,
        "category": "Women",
        "sizes": ["S", "M", "L"],
        "image": "https://images.unsplash.com/photo-1520975698519-59c0c8e4ee02",
        "stock": 16
      },
      {
        "name": "Women's Sleeveless Top",
        "description": "Casual sleeveless top ideal for summer.",
        "price": 499,
        "category": "Women",
        "sizes": ["S", "M"],
        "image": "https://images.unsplash.com/photo-1496747614173-6e36f3e0b3a9",
        "stock": 30
      },
      {
        "name": "Kids' Cartoon Hoodie",
        "description": "Cute cartoon hoodie for kids.",
        "price": 699,
        "category": "Kids",
        "sizes": ["XS", "S", "M"],
        "image": "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
        "stock": 20
      },
      {
        "name": "Kids’ Denim Shorts",
        "description": "Light and comfortable denim shorts for kids.",
        "price": 399,
        "category": "Kids",
        "sizes": ["S", "M"],
        "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        "stock": 25
      },
      {
        "name": "Kids' T-Shirt",
        "description": "Cotton printed t-shirt for boys and girls.",
        "price": 299,
        "category": "Kids",
        "sizes": ["XS", "S", "M"],
        "image": "https://images.unsplash.com/photo-1542131596-68f1fa1845f6",
        "stock": 40
      },
      {
        "name": "Kids’ Winter Jacket",
        "description": "Warm jacket designed for kids' winter comfort.",
        "price": 999,
        "category": "Kids",
        "sizes": ["S", "M"],
        "image": "https://images.unsplash.com/photo-1549068106-b024baf5062d",
        "stock": 10
      },
      {
        "name": "Men’s Polo Shirt",
        "description": "Premium cotton polo shirt with soft collar.",
        "price": 899,
        "category": "Men",
        "sizes": ["M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "stock": 14
      },
      {
        "name": "Women's Kurti",
        "description": "Traditional Indian kurti with embroidery.",
        "price": 699,
        "category": "Women",
        "sizes": ["S", "M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1602810318383-eac8e3a73a1d",
        "stock": 28
      },
      {
        "name": "Men's Track Pants",
        "description": "Breathable athletic track pants for sports.",
        "price": 699,
        "category": "Men",
        "sizes": ["M", "L", "XL"],
        "image": "https://images.unsplash.com/photo-1520975698519-59c0c8e4ee02",
        "stock": 17
      },
      {
        "name": "Women's Sports Bra",
        "description": "High support sports bra for workout sessions.",
        "price": 599,
        "category": "Women",
        "sizes": ["S", "M", "L"],
        "image": "https://images.unsplash.com/photo-1520975918318-3ce69a4f3b95",
        "stock": 26
      },
      {
        "name": "Men's Sleeveless Vest",
        "description": "Cotton sleeveless vest for gym and everyday use.",
        "price": 299,
        "category": "Men",
        "sizes": ["M", "L"],
        "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        "stock": 32
      },
      {
        "name": "Kids' Jogger Pants",
        "description": "Soft jogger pants for kids' daily wear.",
        "price": 499,
        "category": "Kids",
        "sizes": ["S", "M"],
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "stock": 18
      }
    ];

    await Product.insertMany(products);

    res.json({ message: "20 Products added successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
