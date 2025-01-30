import User from "../models/userModel.js";
import fs from "fs";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        code: -6,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      code: 1,
      message: "User Detail",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the user",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      code: 1,
      message: "Games List",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the users",
    });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const fileRoute = "./src/uploads/users/";

    if (req.file == undefined) {
      return res.status(400).json({
        code: -101,
        message: "Please upload a file.",
      });
    }
    // Delete previous photo
    if (req.user.photo != null) {
      console.log("Ruta:" + fileRoute + req.user.photo);
      fs.access(fileRoute + req.user.photo, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(400).json({
            code: -102,
            message: "The file does not exist or cannot be accessed",
            error: err,
          });
        } else {
          // Delete file
          fs.unlink(fileRoute + req.user.photo, (err) => {
            if (err) {
              console.error("Error deleting file: ", err);
              return res.status(500).json({
                code: -103,
                message: "Error deleting file",
                error: err,
              });
            }
            res.status(200).json({ code: 1, message: "File deleted" });
          });
        }
      });
    } else {
      return res.status(400).json({ code: -104, message: "No file to delete" });
    }

    await User.update(
      { photo: req.file.filename },
      { where: { id_user: req.user.id_user } }
    );

    return res.status(200).json({
      code: 1,
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB.",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      error: `${err}`,
    });
  }
};
