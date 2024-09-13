import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct) {
			return { success: false, message: "Please fill in all fields" };
		}
		const res = await fetch("/api/product", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newProduct),
		});

		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/product");
		const data = await res.json();
		set({ products: data });
	},
	deleteProduct: async (P_id) => {
		const res = await fetch(`/api/product/${P_id}`, { method: "DELETE" });
		const data = await res.json();

		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.filter((product) => product._id !== P_id),
		}));
		return { success: true, message: data.message };
	},
	updateProduct: async (p_id, updateProduct) => {
		const res = await fetch(`/api/product/${p_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updateProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.map((prod) =>
				prod._id === p_id ? data.data : prod
			),
		}));
		return { success: true, message: data.message };
	},
}));
