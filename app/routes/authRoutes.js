const express = require("express");
const router = express.Router();
const path = require("path");
const shell = require('shelljs');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fullPath = path.join(__basedir, "uploads");
        shell.mkdir('-p', fullPath);
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});
var upload = multer({ storage: storage });

const { login, register, sendLink, enterRound, updateAvatar, updateUserName, updateUserLang } = require("../controllers/auth.controller");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const requireAuth = require("../middlewares/requireAuth");

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const sendLinkSchema = Joi.object({
    email: Joi.string().email().required(),
});


router.post(
    "/register",
    upload.single('image'),
    validator.body(registerSchema),
    register
);

router.post(
    "/login",
    validator.body(loginSchema),
    login
);

router.post(
    "/sendLink",
    validator.body(sendLinkSchema),
    sendLink
);

router.post(
    "/enterRound",
    // validator.body(enterRoundSchema),
    requireAuth,
    enterRound
);

router.post(
    "/updateAvatar",
    upload.single('image'),
    requireAuth,
    updateAvatar
);

router.post(
    "/updateUserName",
    requireAuth,
    updateUserName
);

router.post(
    "/updateUserLang",
    requireAuth,
    updateUserLang
);

router.get(
    "/me",
    requireAuth,
    (req, res) => {
        res.status(200).json({
            me: {
                _id: req.user.userId,
                email: req.user.email,
                username: req.user.username
            },
        });
    }
);

module.exports = router;
