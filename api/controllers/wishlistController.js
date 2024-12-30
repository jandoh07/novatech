import User from "../models/userModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { wishlist: id },
      },
      { new: true }
    ).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;

    res.json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { wishlist: id },
      },
      { new: true }
    ).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;

    res.json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        wishlist: [],
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
