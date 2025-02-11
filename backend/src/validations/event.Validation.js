import { body } from "express-validator";

export const eventValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description should be a string")
    .isLength({ min: 10 })
    .withMessage("Description should be at least 10 characters"),
];
