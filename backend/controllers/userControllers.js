import { uploadFiles } from "../middleware/uploadFilesMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";
import User from "../models/User.js";

// Function to register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists or not
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("Utilizator deja înregistrat!");
    }

    // Create a new user
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

// Function to log in a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Emailul nu a fost găsit!");
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Parola sau emailul sunt invalide!");
    }
  } catch (error) {
    next(error);
  }
};

// Function to get user profile
export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } else {
      let error = new Error("Utilizator neînregistrat!");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Function to update user profile
export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("Utilizator neînregistrat!");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error(
        "Parola trebuie să fie formată din cel puțin 6 caractere."
      );
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();

    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

// Function to update user's profile picture
export const updateProfilePicture = async (req, res, next) => {
  try {
    uploadFiles(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        return next(error);
      }

      if (req.files && req.files["profilePicture"]) {
        let filename;
        let updatedUser = await User.findById(req.user._id);
        filename = updatedUser.avatar;
        if (filename) {
          fileRemover(filename);
        }
        updatedUser.avatar = req.files["profilePicture"][0].filename;
        await updatedUser.save();
        return res.json({
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          admin: updatedUser.admin,
          token: await updatedUser.generateJWT(),
        });
      } else {
        let filename;
        let updatedUser = await User.findById(req.user._id);
        filename = updatedUser.avatar;
        updatedUser.avatar = "";
        await updatedUser.save();
        fileRemover(filename);
        return res.json({
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          admin: updatedUser.admin,
          token: await updatedUser.generateJWT(),
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Function to update post's picture
export const updatePostPicture = async (req, res, next) => {
  try {
    uploadFiles(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        next(error);
      } else {
        // everything went well
        if (req.files && req.files["postPicture"]) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.files["postPicture"][0].filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
