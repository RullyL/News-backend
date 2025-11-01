import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

process.env.PG_FORCE_JS = "1"; // <---- tambahkan ini

import db from "../config/database.js";

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  logging: false,
});

export default db;
