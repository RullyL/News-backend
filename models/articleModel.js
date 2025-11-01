import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Category from "./categoryModel.js";

const { DataTypes } = Sequelize;

const Article = db.define("articles", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING(500) },
  image_url: { type: DataTypes.STRING(255) },
  headline: { type: DataTypes.BOOLEAN, defaultValue: false },
  status: { type: DataTypes.ENUM("draft","published"), defaultValue: "draft" },
  published_at: { type: DataTypes.DATE },
  category_id: { type: DataTypes.INTEGER, references: { model: "categories", key: "id" } },
  author: { type: DataTypes.STRING(100), allowNull: false },
  author_email: { type: DataTypes.STRING(150) },
  created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
  freezeTableName: true,
  timestamps: false,
});

// Relasi
Article.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Article, { foreignKey: "category_id" });

export default Article;

(async () => {
  await db.sync({ alter: true }); // otomatis menyesuaikan tabel
})();
