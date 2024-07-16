const express = require("express");

const {
  getAllPostsController,
  getAllPostsByUserController,
  createPostsController,
  updatePostController,
  getPostByIdController,
  deletePostController,
  addCommentController,
  addLikesController,
} = require("../controllers/postControllers");

const router = express.Router();

router.get("/", getAllPostsController); //get all posts
router.get("/:id", getAllPostsByUserController); //retrieve posts by user
router.post("/add", createPostsController); //creating posts
router.put("/update/:id", updatePostController); //updating post
router.get("/post/:id", getPostByIdController); //get a particular post
router.delete("/delete/:id", deletePostController); //deleting a particular post
router.post("/comment", addCommentController); //add  a comment
router.post("/likes", addLikesController); // add likes in a post

module.exports = router;
