

const Post = require("../models/Post") // new
import { Request, Response } from 'express';

export class PostController {
    public apiGetPosts(req: Request, res: Response) {
        try {
            const post = Post.findOne({ _id: req.params.id })
            res.send(post)
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    }
    public apiStorePost(req: Request, res: Response) {
        try {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
            })
            post.save()
            res.send(post)
        } catch (e) {
            res.status(500).json({ error: e.message })

        }
    }
    public apiUpdatePost(req: Request, res: Response) {
        try {
            const post = Post.findOne({ _id: req.params.id })

            if (req.body.title) {
                post.title = req.body.title
            }

            if (req.body.content) {
                post.content = req.body.content
            }

            post.save()
            res.send(post)
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    }
    public apiDeletePost(req: Request, res: Response) {
        try {
            Post.deleteOne({ _id: req.params.id })
            res.status(204).send()
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    }
}