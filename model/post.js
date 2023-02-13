import { mongoose } from "mongoose";
// import ObjectId from "mongoose.Types.ObjectId";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
const post = mongoose.model("post", postSchema);
export default post;
