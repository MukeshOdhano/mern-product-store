import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.DB_URL);
		console.log("MongoDB Connected: ", connect.connection.host);
	} catch (err) {
		console.log(`Database connection error: `, err.message);
		process.exit(1);
	}
};
