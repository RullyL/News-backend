import express from "express";
import { getCategories, createCategory, getCategoryById } from "../controller/categoryController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.post("/categories", createCategory);

export default router;
