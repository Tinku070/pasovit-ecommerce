import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// =======================
// GET CART
// =======================
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { user: req.user._id, items: [] });
};

// =======================
// ADD TO CART  (with stock validation)
// =======================
export const addToCart = async (req, res) => {
  const { productId, size, qty } = req.body;

  // Validate product
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Validate stock availability
  if (product.stock < qty) {
    return res.status(400).json({
      message: `Only ${product.stock} items available in stock`,
    });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find(
    (item) => item.product.toString() === productId && item.size === size
  );

  if (existing) {
    if (product.stock < existing.qty + qty) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`,
      });
    }
    existing.qty += qty;
  } else {
    cart.items.push({ product: productId, size, qty });
  }

  await cart.save();
  res.status(201).json(cart);
};

// =======================
// UPDATE CART ITEM (with stock validation)
// =======================
export const updateCartItem = async (req, res) => {
  const { productId, size, qty } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId && i.size === size
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Validate stock
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock < qty) {
    return res.status(400).json({
      message: `Only ${product.stock} items available in stock`,
    });
  }

  item.qty = qty;

  await cart.save();
  res.json(cart);
};

// =======================
// REMOVE CART ITEM
// =======================
export const removeCartItem = async (req, res) => {
  const { productId, size } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (i) =>
      !(
        i.product.toString() === productId &&
        i.size === size
      )
  );

  await cart.save();
  res.json(cart);
};
