import React, { useState } from "react";
import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	VStack,
	useColorModeValue,
	useDisclosure,
	useToast,
	Modal,
	Input,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useProductStore } from "../store/product.js";

function ProductCard({ product }) {
	const toast = useToast();
	const { deleteProduct, updateProduct } = useProductStore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [updatedProduct, setUpdateProduct] = useState(product);
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const handleDelete = async (P_id) => {
		const { success, message } = await deleteProduct(P_id);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 1000,
				isClosable: true,
			});
		}
	};
	const handleUpdateProduct = async (P_id, updateData) => {
		const { success, message } = await updateProduct(P_id, updateData);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 1000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow={`xl`}
			rounded={"lg"}
			overflow={"hidden"}
			transition={"all 0.5s"}
			_hover={{ transform: "scale(1.009)", shadow: "2xl" }}
			bg={bg}>
			<Image
				src={product.image}
				alt={product.name}
				h={60}
				w={"full"}
				objectFit="cover"
				roundedBottom={"2xl"}
				bg={useColorModeValue("gray.300", "gray.700")}
				shadow={"md"}
			/>

			<Box p={4}>
				<Heading as={"h3"} size={"md"} mb={1}>
					{product.name}
				</Heading>
				<Text fontSize="lg" color={textColor} mb={6}>
					${product.price}
				</Text>
				<HStack spacing={2}>
					<IconButton
						icon={<FaEdit />}
						onClick={onOpen}
						colorScheme="blue"
					/>
					<IconButton
						icon={<AiFillDelete />}
						onClick={() => {
							handleDelete(product._id);
						}}
						colorScheme="red"
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={(e) =>
									setUpdateProduct({
										...updatedProduct,
										name: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Product Price"
								name="price"
								value={updatedProduct.price}
								onChange={(e) =>
									setUpdateProduct({
										...updatedProduct,
										price: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Product Image url"
								name="image"
								value={updatedProduct.image}
								onChange={(e) =>
									setUpdateProduct({
										...updatedProduct,
										image: e.target.value,
									})
								}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								handleUpdateProduct(product["_id"], updatedProduct);
							}}>
							Update
						</Button>
						<Button variant={"ghost"}>Cancle</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default ProductCard;
