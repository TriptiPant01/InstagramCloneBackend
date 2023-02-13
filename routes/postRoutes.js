import express from "express";
import { getPost, addpost } from "../controller/postController.js";
import { tokenVerify } from "../middleware/verify.js";

const route = express.Router();

route.get("/", tokenVerify, getPost);
route.post("/", tokenVerify, addpost);

export default route;
