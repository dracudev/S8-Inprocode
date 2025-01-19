import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import RecoveryToken from "../models/recoveryTokenModel.js";
import sendEmail from "../utils/email/sendEmail.js";
import { validationResult } from "express-validator";
import { serialize } from "cookie";

const clientURL = process.env.CLIENT_URL;

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        code: -2,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );

    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      roles: ["user"],
    });
    await newUser.save();

    // Generate an access token and save it in a secure token (httpOnly)
    const accessToken = jwt.sign(
      { id_user: newUser.id_user, username: newUser.username },
      process.env.JWT_SECRET
    );
    const token = serialize("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", token);

    res.status(200).json({
      code: 1,
      message: "User registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while registering the user",
      error: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        code: -25,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: -5,
        message: "Incorrect password",
      });
    }

    // Generate an access token and save it in a secure token (httpOnly)
    const accessToken = jwt.sign(
      { id_user: user.id_user, username: user.username, roles: user.roles },
      process.env.JWT_SECRET
    );
    const token = serialize("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", token);

    res.status(200).json({
      code: 1,
      message: "Login OK",
      data: {
        user: {
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while logging in",
      error: error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        code: -8,
        message: "Email does not exist",
      });
    }

    let resetToken = crypto.randomBytes(32).toString("hex");

    await new RecoveryToken({
      user_id: user.id_user,
      token: resetToken,
      created_at: Date.now(),
    }).save();

    const link = `${clientURL}/change-password?token=${resetToken}&id=${user.id_user}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      {
        username: user.username,
        link: link,
      },
      "email/template/requestResetPassword.handlebars"
    ).then(
      (response) => {
        console.log("Email response: ", response);
        res.status(200).json({
          code: 100,
          message: "Send Email OK",
          data: {
            token: resetToken,
            link: link,
          },
        });
      },
      (error) => {
        console.error(error);
        res.status(200).json({
          code: -80,
          message: "Send Email KO",
          data: { error },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while sending the email",
      error: error,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    let token_row = await RecoveryToken.findOne({ where: { token } });
    if (!token_row) {
      return res.status(404).json({
        code: -3,
        message: "Invalid or expired token",
      });
    }

    const user = await User.findOne({ where: { id_user: token_row.user_id } });
    if (!user) {
      return res.status(404).json({
        code: -10,
        message: "User not found",
      });
    }

    user.password = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );
    await user.save();

    await RecoveryToken.destroy({
      where: {
        user_id: token_row.user_id,
      },
    });

    // Generate an access token and save it in a secure token (httpOnly)
    const accessToken = jwt.sign(
      { id_user: user.id_user, username: user.username },
      process.env.JWT_SECRET
    );
    const token_jwt = serialize("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", token_jwt);

    res.status(200).json({
      code: 1,
      message: "User Detail",
      data: {
        user: {
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while changing the password",
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  const { cookies } = req;
  const jwt = cookies.token;

  const token = serialize("token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", token);
  res.status(200).json({
    code: 0,
    message: "Logged out - Delete Token",
  });
};
