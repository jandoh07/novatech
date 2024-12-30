import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const { category, page, limit } = req.query;
    const skip = (page - 1) * limit;

    if (category) {
      const products = await Product.find({ category }).skip(skip).limit(limit);
      return res.json(products);
    }

    const products = await Product.find({}).skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, imageUrl, category, brand, stock } = req.body;
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    if (!name || !price || !imageUrl || !category || !brand || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
