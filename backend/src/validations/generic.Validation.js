import { check, body } from "express-validator";
//body(): for validating the fields in the body of the request
//check(): for validating the fields in the query, params, or body of the request

export const idValidator = [check("id").isInt().withMessage("Invalid ID")];

export const nameValidator = [
  body("name").isString().withMessage("Invalid Name file"),
];
