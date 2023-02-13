import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

export default route;
