import Category from "../models/categoryModel.js";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [["id", "ASC"]] });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await Category.create({ name, slug });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
