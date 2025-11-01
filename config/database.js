import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: process.env.NODE_ENV === "production"
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
  logging: console.log,
});

export default db;
