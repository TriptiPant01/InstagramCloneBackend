import User from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET;

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(422).json({
        err: "Please enter all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ err: "User already exist" });
    } else {
      try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          fullname,
          email,
          password: passwordHash,
        });
        await newUser.save();
        return res.status(201).json({ message: "Successfully Created" });
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({
        err: "Please enter all the fields",
      });
    }
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(400).json({ err: "User doesnot exist" });
    } else {
      const isMatch = await bcrypt.compare(password, userDetail.password);
      if (!isMatch) {
        return res.status(400).json({ err: "Invalid Credentials" });
      } else {
        const token = Jwt.sign({ id: userDetail._id }, "secret");
        userDetail.password = undefined;
        res.status(200).json({
          token,
          userDetail,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};
