import { Router } from "express";
import {
	allProducts,
	createProduct,
	deleteProduct,
	singleProduct,
	updateProduct,
} from "../controller/product.control.js";

const router = Router();

router.get("/", allProducts);

router.post("/", createProduct);
router.get("/:id", singleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
