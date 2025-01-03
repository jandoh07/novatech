import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { cart: id },
      },
      { new: true }
    ).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;
    res.json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          cart: id,
        },
      },
      { new: true }
    ).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;
    res.json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          cart: [],
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;
    res.json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await Product.find({
      _id: {
        $in: productIds,
      },
    });

    res.json(products);
  } catch (error) {}
};
