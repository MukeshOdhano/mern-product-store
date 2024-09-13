import React, { useState } from "react";
import { useProductStore } from "../store/product.js";
import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorMode,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";

function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const toast = useToast();

	const { createProduct } = useProductStore();
	const handleProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "success",
				description: message,
				status: "success",
				isClosable: true,
				duration: 2000,
			});
		}
		setNewProduct({ name: "", price: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading textAlign={"center"} as={"h1"} size={"2xl"} my={8}>
					Create New Product
				</Heading>
				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					p={6}
					rounded={"lg"}
					shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) => {
								setNewProduct({ ...newProduct, name: e.target.value });
							}}
						/>
						<Input
							placeholder="Product Price"
							name="price"
							value={newProduct.price}
							onChange={(e) => {
								setNewProduct({ ...newProduct, price: e.target.value });
							}}
						/>
						<Input
							placeholder="Product Image url"
							name="image"
							value={newProduct.image}
							onChange={(e) => {
								setNewProduct({ ...newProduct, image: e.target.value });
							}}
						/>

						<Button colorScheme="blue" w={"full"} onClick={handleProduct}>
							Create
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
}

export default CreatePage;
