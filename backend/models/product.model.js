import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true }
);
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
