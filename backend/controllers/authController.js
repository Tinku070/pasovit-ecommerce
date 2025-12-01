import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, guestCartItems } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // merge guest cart if provided
    if (Array.isArray(guestCartItems) && guestCartItems.length > 0) {
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) cart = await Cart.create({ user: user._id, items: [] });

      guestCartItems.forEach((item) => {
        const existing = cart.items.find(
          (i) =>
            i.product.toString() === item.product &&
            i.size === item.size
        );

        if (existing) {
          existing.qty += item.qty;
        } else {
          cart.items.push({
            product: item.product,
            size: item.size,
            qty: item.qty || 1,
          });
        }
      });

      await cart.save();
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
export const logoutUser = (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
export const getMe = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};
