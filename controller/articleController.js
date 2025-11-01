import Article from "../models/articleModel.js";
import Category from "../models/categoryModel.js";

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: Category, attributes: ["id", "name"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ["id", "name"] }],
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create article
export const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update article
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    await article.update(req.body);
    res.json({ message: "Article updated", article });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete article
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    await article.destroy();
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
