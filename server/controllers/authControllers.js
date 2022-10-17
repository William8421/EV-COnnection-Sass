import userApp from "../models/userApp.js";
import { validationResult } from "express-validator";
import generateToken from "../helpers/generateToken.js";
import bcrypt from "bcryptjs";
import axios from "axios";

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    username,
    fname,
    lname,
    email,
    password,
    isOwner,
    availability,
    address,
    telNumber,
    reviewRate,
    typeOfCharger,
    imgProfile,
  } = req.body;

  const user = await userApp.findByEmail(email);

  if (user)
    return res.status(409).json({ msg: "Sorry the e-mail already exists" });

  const userName = await userApp.findByUsername(username);

  if (userName)
    return res.status(409).json({ msg: "Sorry the username already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const allUsers = await userApp.find();

  const Id =
    allUsers.reduce((a, b) => {
      return Math.max(a, b.id);
    }, 0) + 1;

  try {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.POS_STACK_API}&query=${address.houseNr}%20${address.street}%20${address.typeOfStreet},%20${address.city}%20DE`
    );
    const addressInfo = response.data.data[0];

    const newUserApp = await userApp.create({
      username,
      fname,
      lname,
      email,
      password,
      isOwner,
      availability,
      address,
      telNumber,
      reviewRate,
      typeOfCharger,
      imgProfile,
      addressInfo: response.data.data[0],
      password: hashedPassword,
      id: Id,
    });

    if (newUserApp) {
      const payload = {
        id: Id,
        username: username,
      };
      const token = generateToken(payload);
      /* if(!token) return new Error */
      res
        .status(200)
        .json({ user: newUserApp, token, msg: "Thank you for signing up!" });
    }
  } catch (err) {
    res.status(400).json({ errorMessage: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userApp.findByEmail(email);
  if (!user)
    return res.status(404).json({
      msg: `Either email or password is not correct !!!`,
    });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(404).json({
      msg: `Your email or password are not correct !!!`,
    });
  }

  const token = generateToken({ id: user.id, name: user.name });

  res.status(200).json({
    message: "you are logged in !!!",
    token: token,
    user: user,
  });
};

const tokenValidator = (req, res) => {
  res.json(req.user);
};

const getAllOwners = (req, res) => {
 
  try {
    if (req.body.typeOfCharger === "all") {
      const allUsers = userApp.find({ isOwner: true }, function (err, users) {
        res.status(200).json(users);
      });
    } else {
      const allUsers = userApp.find(
        { isOwner: true, typeOfCharger: req.body.typeOfCharger },
        function (err, users) {
          res.status(200).json(users);
        }
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getInfo = async (req, res) => {
  try {
    const getUser = await userApp.find(
      { id: req.body.id },
      function (err, user) {
        res.status(200).json(user);
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    fname,
    lname,
    isOwner,
    availability,
    address,
    telNumber,
    typeOfCharger,
    imgProfile,
  } = req.body;

  try {
    userApp.findOneAndUpdate(
      { id },
      {
        username,
        fname,
        lname,
        isOwner,
        availability,
        address,
        telNumber,
        typeOfCharger,
        imgProfile,
      },
      { new: true },
      (err, data) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(data);
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
export {
  registerUser,
  loginUser,
  tokenValidator,
  getAllOwners,
  getInfo,
  updateProfile,
};
