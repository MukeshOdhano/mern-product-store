import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import ProductRoutes from "./routes/product.route.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = path.resolve();

// singular -id- create, read, update, delete
app.use("/api/product", ProductRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://localhost:${PORT}`);
	console.log(process.env.NODE_ENV);
});
