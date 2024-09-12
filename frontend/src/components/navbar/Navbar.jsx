import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { CiSquarePlus, CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Container maxW={"100%"} p={2}>
			<Flex
				h={16}
				px={4}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{ base: "column", sm: "row" }}
				bgColor={useColorModeValue("gray.100", "gray.800")}
				backdropBlur={"2px"}
				borderRadius={8}
				shadow={"lg"}>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					bgColor={useColorModeValue("gray.100", "gray.900")}
					padding={1}
					px={3}
					borderRadius={6}>
					<Link to={"/"}>P-Stor</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button fontSize={30} padding={0}>
							<CiSquarePlus />
						</Button>
					</Link>
					<Button fontSize={30} padding={0} onClick={toggleColorMode}>
						{colorMode === "light" ? <CiSun /> : <FaMoon />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
}

export default Navbar;
