import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const article = await prisma.article.create({ data: req.body });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Article not found" });

    const article = await prisma.article.update({ where: { id }, data: req.body });
    res.json({ message: "Article updated", article });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Article not found" });

    await prisma.article.delete({ where: { id } });
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
