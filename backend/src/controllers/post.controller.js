import { Post } from "../models/post.model.js";

// Create a new post

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const post = await Post.create({ name, description, age })
        
        res.status(201).json({
            message: "Publicacion creada exitosamente", post
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor", error
        });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        const length = posts.length;
        res.status(200).json({ length, posts});
  
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor", error
        });
    }
}

const updatePost = async (req, res) => {
    try {

        //validacion basica de verificacion de campos vacios
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No se proporcionaron datos para actualizar"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body,
            { new: true });

        if (!post) return res.status(404).json({
            message: "Publicacion no encontrada"
        });

        res.status(200).json({
            message: "Publicacion actualizada exitosamente", post
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor", error
        });   
    }
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({
            message: "Publicacion no encontrada"
        });

        res.status(200).json({
            message: "Publicacion eliminada exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor", error
        });
    }
}

export { createPost, getPosts, updatePost, deletePost };