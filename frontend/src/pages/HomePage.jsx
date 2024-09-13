import React, { useEffect } from "react";
import {
	Container,
	SimpleGrid,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

function HomePage() {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Container maxW={"full"} p={2}>
			<VStack>
				<Text
					fontSize={30}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}>
					Current Products
				</Text>

				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 4 }}
					spacing={10}
					p={10}
					w={"full"}>
					{products.map((prod) => (
						<ProductCard key={prod._id} product={prod} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text
						my={10}
						fontSize={"xl"}
						textAlign={"center"}
						fontWeight={"bold"}
						color={"gray.500"}>
						{"No Product found :)"}

						<Link to="/create">
							<Text
								as={"span"}
								ml={3}
								color="blue.500"
								_hover={{ textDecoration: "underline" }}>
								Create Product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
}

export default HomePage;
