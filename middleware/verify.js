import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(403).json({ err: "Access Denied" });
    } else {
      const verified = Jwt.verify(token, "secret");
      if (verified) {
        req.user = verified;
        next();
      } else {
        return res.status(400).json({ err: "Invalid Credentials" });
      }
    }
  } catch (err) {
    return res.status(500).json({ er: err.message });
  }
};
