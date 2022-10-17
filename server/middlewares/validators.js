import { check,body } from "express-validator";

export const validatorSignUp = () => {
  return [
    check("username", "Name is required").notEmpty(),
    check("fname", "Name is required").notEmpty(),
    check("lname", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ];
};

export const validatorLogIn = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ];
};