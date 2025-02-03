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
  body("category")
    .exists()
    .withMessage("Category is required")
    .isArray()
    .withMessage("Category should be an array")
    .custom((categories) => {
      if (categories.length === 0) {
        throw new Error("Category should have at least one value");
      }
      return true;
    })
    .custom((categories) => {
      const allowedCategories = [
        "Meeting",
        "Conference",
        "Game Jam",
        "Competition",
      ];
      const invalidCategories = categories.filter(
        (category) => !allowedCategories.includes(category)
      );
      if (invalidCategories.length > 0) {
        throw new Error(
          `Invalid category(ies): ${invalidCategories.join(", ")}`
        );
      }
      return true;
    }),
];
