import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let products;
    let totalCount;

    if (category) {
      totalCount = await Product.countDocuments({ category });
      products = await Product.find({ category })
        .skip(skip)
        .limit(parseInt(limit));
    } else {
      totalCount = await Product.countDocuments({});
      products = await Product.find({}).skip(skip).limit(parseInt(limit));
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      products,
      totalCount,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { ids } = req.params;

    if (!ids) {
      return res.status(400).json({ message: "Product ID(s) are required" });
    }

    let products;
    if (ids.includes(",")) {
      const idsArray = ids.split(",");

      products = await Product.find({
        _id: {
          $in: idsArray,
        },
      });
    } else {
      products = await Product.findById(ids);
    }

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(products);
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

export const search = async (req, res) => {
  const { query } = req.params;
  const { limit = 10, page = 1, brand, price, rating, category } = req.query;
  try {
    const skip = (page - 1) * limit;

    const baseQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    if (brand) baseQuery.brand = { $in: brand.split(",") };
    if (price)
      baseQuery.price = {
        $gte: parseInt(price.split(",")[0]) || 0,
        $lte: parseInt(price.split(",")[1]) || 1000000,
      };
    if (rating) baseQuery.rating = { $gte: parseInt(rating.value) };
    if (category) baseQuery.category = { $in: category.split(",") };

    const totalCount = await Product.countDocuments(baseQuery);
    const products = await Product.find(baseQuery)
      .skip(skip)
      .limit(parseInt(limit));
    const totalPages = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ products, totalCount, totalPages, currentPage: parseInt(page) });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSearchSuggestions = async (req, res) => {
  const { query } = req.params;

  try {
    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(5);

    const productNames = results.map((product) => {
      const words = product.name.split(/[,|-]/)[0].split(" ");
      return words.slice(0, 4).join(" ");
    });

    res.status(200).json(productNames);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
