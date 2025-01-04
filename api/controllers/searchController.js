import Product from "../models/productModel.js";

export const search = async (req, res) => {
  const { query } = req.params;
  const { limit } = req.query;

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(parseInt(limit));

    res.status(200).json(results);
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
