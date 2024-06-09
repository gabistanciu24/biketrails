import { uploadFiles } from "../middleware/uploadFilesMiddleware.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { fileRemover } from "../utils/fileRemover.js";
import { v4 as uuidv4 } from "uuid";

export const createPost = async (req, res, next) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    try {
      const { title, caption, body, user } = req.body;

      const post = new Post({
        title: title || "sample title",
        caption: caption || "sample caption",
        slug: uuidv4(),
        body: body ? JSON.parse(body) : { type: "doc", content: [] },
        photo: req.files.postPicture ? req.files.postPicture[0].filename : "",
        photoGallery: req.files.photoGallery
          ? req.files.photoGallery.map((file) => file.filename)
          : [],
        gpxTrail: req.files.gpxTrail ? req.files.gpxTrail[0].filename : "",
        user: user || req.user._id,
      });

      const createdPost = await post.save();
      return res.json(createdPost);
    } catch (error) {
      next(error);
    }
  });
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      next(error);
      return;
    }

    uploadFiles(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        const { title, caption, slug, body, tags, categories } = req.body;

        post.title = title || post.title;
        post.caption = caption || post.caption;
        post.slug = slug || post.slug;
        post.body = body ? JSON.parse(body) : post.body;
        post.tags = tags ? JSON.parse(tags) : post.tags;
        post.categories = categories ? JSON.parse(categories) : post.categories;

        if (req.files.postPicture) {
          if (post.photo) {
            fileRemover(post.photo);
          }
          post.photo = req.files.postPicture[0].filename;
        }

        if (req.files.photoGallery) {
          if (post.photoGallery && post.photoGallery.length) {
            post.photoGallery.forEach((file) => fileRemover(file));
          }
          post.photoGallery = req.files.photoGallery.map(
            (file) => file.filename
          );
        }

        if (req.files.gpxTrail) {
          if (post.gpxTrail) {
            fileRemover(post.gpxTrail);
          }
          post.gpxTrail = req.files.gpxTrail[0].filename;
        }

        const updatedPost = await post.save();
        return res.json(updatedPost);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    // Remove associated files
    if (post.photo) {
      fileRemover(post.photo);
    }
    if (post.photoGallery && post.photoGallery.length) {
      post.photoGallery.forEach((file) => fileRemover(file));
    }
    if (post.gpxTrail) {
      fileRemover(post.gpxTrail);
    }

    return res.json({ message: "Post is successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }
    return res.json(post);
  } catch (error) {}
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
    ]);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
