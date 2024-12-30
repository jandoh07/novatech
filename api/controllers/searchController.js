import Product from "../models/productModel.js";

export const search = async (req, res) => {
  try {
    const { query } = req.params;
    const results = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
