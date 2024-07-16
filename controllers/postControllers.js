const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const userModel = require("../models/userModel");

const getAllPostsController = async (req, res) => {
  try {
    const allPosts = await postModel.find();
    if (allPosts.length) {
      res.status(200).json({ allPosts });
    } else {
      res.status(400).json({ message: "No Posts found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};

const getAllPostsByUserController = async (req, res) => {
  const userId = req.params.id;
  try {
    const existingUser = await userModel.findById(userId);
    if (existingUser) {
      const posts = await postModel.find({ user_id: userId });
      if (posts) {
        res.status(200).json({ posts });
      } else {
        res.status(400).json({ message: "no posts found." });
      }
    } else {
      res.status(404).send({ message: "user not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};

const createPostsController = async (req, res) => {
  const { title, description, image_url, user_id } = req.body;
  try {
    const existingUser = await userModel.findById(user_id);
    if (existingUser) {
      const newPost = await postModel.create({
        title: title,
        description: description,
        image_url: image_url,
        user_id: user_id,
        likes: [],
        comments: [],
      });
      res.status(201).send({ message: "Post created successfully.", newPost });
    } else {
      res.status(404).send({ message: "user not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};
const updatePostController = async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await postModel.findById(postId);
    if (existingPost) {
      const updatedPost = await postModel.findByIdAndUpdate(postId, req.body);
      res
        .status(201)
        .send({ message: "post updated successfully.", updatedPost });
    } else {
      res.status(400).send({ message: "post not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something problem happened" });
  }
};

const getPostByIdController = async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await postModel.findById(postId).populate("user_id");
    if (existingPost) {
      res.status(200).send(existingPost);
    } else {
      res.status(400).send({ message: "no posts found." });
    }
  } catch {
    res.status(500).send({ message: "something problem happened." });
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await postModel.findById(postId);
    if (existingPost) {
      const deletedPost = await postModel.findByIdAndDelete(postId);
      res
        .status(200)
        .send({ message: "posts deleted successfully.", deletedPost });
    } else {
      res.status(400).send({ message: "no posts found." });
    }
  } catch {
    res.status(500).send({ message: "something problem happened." });
  }
};

const addCommentController = async (req, res) => {
  const { comment_description, post_id, user_id } = req.body;
  try {
    const existingPost = await postModel.findById(post_id);
    if (existingPost) {
      const newComment = await commentModel.create({
        comment_description: comment_description,
        post_id: post_id,
        user_id: user_id,
      });

      const updatedComments = [...existingPost.comments, newComment];

      const commentedPost = await postModel.findByIdAndUpdate(post_id, {
        comments: updatedComments,
      });

      res
        .status(201)
        .send({ message: "comment created successfully.", newComment });
    } else {
      res.status(404).send({ message: "posts not found" });
    }
  } catch {
    res.status(500).send({ message: "something problem happened" });
  }
};

const addLikesController = async (req, res) => {
  const { post_id, user_id } = req.body;
  try {
    const existingPost = await postModel.findById(post_id);
    if (existingPost) {
      const newLikes = [...existingPost.likes, user_id];
      const updatedLikesPost = await postModel.findByIdAndUpdate(post_id, {
        likes: newLikes,
      });
      res.status(201).send({
        message: "like added successfully",
        totalLikes: newLikes.length,
      });
    } else {
      res.status(400).send({ message: "post not found." });
    }
  } catch {
    res.status(500).send({ message: "something problem happened." });
  }
};

module.exports = {
  getAllPostsController,
  getAllPostsByUserController,
  createPostsController,
  updatePostController,
  getPostByIdController,
  deletePostController,
  addCommentController,
  addLikesController,
};
