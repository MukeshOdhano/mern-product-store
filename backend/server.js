import express from "express";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all product
app.use("/api/products", ProductRoutes);

// singular -id- create, read, update, delete
app.use("/api/product", ProductRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://localhost:${PORT}`);
});
