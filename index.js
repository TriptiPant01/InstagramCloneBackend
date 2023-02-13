import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Database from "./db.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRoutes.js";
import { tokenVerify } from "./middleware/verify.js";

const app = Express();
app.use(bodyParser.json());
app.use(cors());

const customMiddleware = (req, res, next) => {
  console.log("middleware");
  next();
};
// app.use(customMiddleware);

app.get("/", customMiddleware, (req, res) => {
  res.send("hello world test");
});
app.get("/test", tokenVerify, (req, res) => {
  res.send("hello world wow");
});

app.use("/", userRoute);
app.use("/api/post", postRoute);

Database();
app.listen(4000, () => console.log(`connected to port 4000`));
