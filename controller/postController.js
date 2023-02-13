import User from "../model/user.js";
import Post from "../model/post.js";

export const getPost = async (req, res) => {
  try {
    const postList = await Post.find().populate("postedBy", "fullname");
    return res.status(200).json(postList);
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
};

export const addpost = async (req, res) => {
  console.log(req.body);
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ err: "please enter the post" });
    } else {
      const newPost = await Post.create({
        title,
        postedBy: req.user.id,
      });

      await newPost.save();
      return res.status(201).json({
        message: "succesfully posted ",
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
