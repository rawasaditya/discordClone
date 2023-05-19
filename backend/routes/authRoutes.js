const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const registerSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.register
);
router.post("/login", validator.body(loginSchema), authControllers.login);

module.exports = router;
