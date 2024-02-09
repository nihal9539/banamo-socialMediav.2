import mongoose from "mongoose";
import PostModel from "../model/postModel.js";



export const createPost = async (req, res) => {
    try {
        const newPost = new PostModel(req.body);
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getAllPost = async (req, res) => {

    try {
        const post = await PostModel.find()

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getUserPost = async (req, res) => {
    const {id} = req.params
    try {
        const post = await PostModel.find({userId:id})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updatePost = async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.id
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("post updated")
        } else {

            res.status(403).json("Action for hidden")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.id
    try {
        const post = await PostModel.findById(postId)
            await post.deleteOne()
            res.status(200).json("post delete")
       
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//like and unlike post
export const likePost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body;

  
  
    try {
        const post = await PostModel.findById(id);
      
        if (post.like.includes(userId)) {
            await post.updateOne({ $pull: { like: userId } });
            res.status(200).json(post);
        } else {
 
            await post.updateOne({ $push: { like: userId } });
          res.status(200).json(post);
        }
      } catch (error) {
        res.status(500).json(error);
      }
}


