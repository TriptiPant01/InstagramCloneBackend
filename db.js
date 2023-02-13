import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PASSWORD = process.env.PASSWORD;

const Connection = () => {
  const MONGOOSE_URL = `mongodb+srv://triptipant:${PASSWORD}@cluster0.ugw0mo1.mongodb.net/?retryWrites=true&w=majority`;
  // console.log(MONGOOSE_URL);
  mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log("database connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Error while connecting to database", error.message);
  });
};

export default Connection;
