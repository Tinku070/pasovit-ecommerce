import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import sendOrderEmail from "../utils/sendEmail.js";

// POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // optional stock validation
    for (const item of cart.items) {
      if (item.product.stock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${item.product.name}` });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      qty: item.qty,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    // decrease stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.qty;
      await product.save();
    }

    // clear cart
    cart.items = [];
    await cart.save();

    // don't let email failure break API
    try {
      await sendOrderEmail(order, req.user);
    } catch (emailErr) {
      console.error("Error sending email:", emailErr.message);
    }

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/my
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product"
    );
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};
