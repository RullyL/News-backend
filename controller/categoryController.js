import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.create({ data: { name, slug } });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: Number(req.params.id) } });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
