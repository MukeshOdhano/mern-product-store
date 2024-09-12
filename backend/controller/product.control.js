import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";

export const allProducts = async (req, res) => {
	try {
		const allProducts = await ProductModel.find();
		if (!allProducts) {
			return res
				.status(404)
				.json({ success: false, message: "there is no product available" });
		}
		res.status(200).json(allProducts);
	} catch (err) {
		console.log("ERROR in GET ALL products: ", err.message);
	}
};

export const createProduct = async (req, res) => {
	const { name, price, image } = req.body;
	if (!name || !price || !image) {
		return res.status(400).json({
			success: false,
			message: "Please provide all fields",
		});
	}

	const newProduct = await ProductModel.create({ name, price, image });

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (err) {
		console.log("ERROR in post product: ", err.message);
	}
};
export const singleProduct = async (req, res) => {
	try {
		const product = await ProductModel.findOne({ _id: req.params.id });
		if (!product) {
			return res
				.status(404)
				.json({ success: false, message: "Product Not Found" });
		}

		res.status(200).json({ success: true, data: product });
	} catch (err) {
		console.log(err);
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Product ID not found" });
	}
	try {
		// Optionally validate ObjectId here
		const updateProduct = await ProductModel.findByIdAndUpdate(id, product, {
			new: true,
		});

		res.status(200).json({ success: true, data: updateProduct });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the product",
		});
		console.log("ERROR in PUT: ", err.message);
	}
};
export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await ProductModel.findOneAndDelete({ _id: id });
		if (!product) {
			return res
				.status(404)
				.json({ success: false, message: "product is unavailable" });
		}

		res.status(200).json({ success: true, deleted_Product: product });
	} catch (err) {
		console.log("ERROR in delete product: ", err.message);
	}
};
