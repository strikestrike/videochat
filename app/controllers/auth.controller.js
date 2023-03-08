const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");

const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // check if user exists
        const userExists = await User.exists({ email: email.toLowerCase() });

        if (userExists) {
            return res.status(409).send("E-mail already in use.");
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        const userDoc = {
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        };

        if (req.file) {
            userDoc.image = "uploads" + "/" + req.file.filename;
        }

        const saalik = await User.findOne({ email: "salikmubien@gmail.com" });

        if (saalik) {
            userDoc.friends = [saalik._id]
        }

        // create user document and save in database
        const user = await User.create(userDoc);

        if (saalik) {
            saalik.friends = [...saalik.friends, user._id];
            await saalik.save()
        }

        // create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d",
            }
        );

        res.status(201).json({
            userDetails: {
                _id: user._id,
                email: user.email,
                token: token,
                username: user.username,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occured. Please try again");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
                .status(400)
                .send("Invalid credentials. Please try again");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res
                .status(400)
                .send("Invalid credentials. Please try again");
        }

        // send new token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d",
                // expiresIn: 60,
            }
        );

        return res.status(200).json({
            userDetails: {
                _id: user._id,
                email: user.email,
                token: token,
                username: user.username,
            },
        });

    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again");
    }
};

const sendLink = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
                .status(400)
                .send("Invalid email. Please try again");
        }

        // TODO send mail, then return success: true, comment following lines.
        const token = jwt.sign(
            {
                userId: user._id,
                email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d",
            }
        );

        return res.status(200).json({
            link: 'https://10.10.13.242:5000/login?token=' + token,
        });

    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again");
    }
};

const enterRound = async (req, res) => {
    try {
        const { email, tag } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
                .status(400)
                .send("Invalid email. Please try again");
        }
        // TODO: check if user is same for the token
        if (user.email != email) {
            return res
                .status(400)
                .send("Invalid token. Please try again");
        }

        return res.status(200).json({
            success: true,
            user: {
                userId: user._id,
                email,
                username: user.username,
                image: user.image ? req.protocol + "://" + req.hostname + ":5000/" + user.image : '',
                tag,
                languages: user.languages,
            }
        });

    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again");
    }
};

const updateAvatar = async (req, res) => {

    try {
        const { userId } = req.body;

        if (!req.file) {
            return res.status(400).send("invalid file");
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("The id: " + userId + " is invalid");
        }

        user.image = "uploads" + "/" + req.file.filename;
        await user.save();

        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occured. Please try again");
    }
};

const updateUserName = async (req, res) => {

    try {
        const { username, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("The id: " + userId + " is invalid");
        }

        user.username = username;
        await user.save();

        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occured. Please try again");
    }
};

const updateUserLang = async (req, res) => {

    try {
        const { langs, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("The id: " + userId + " is invalid");
        }

        console.log('updateUserLang', langs);
        let languages = JSON.parse(langs);

        user.languages = languages;
        await user.save();

        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occured. Please try again");
    }
};

module.exports = {
    login,
    register,
    sendLink,
    enterRound,
    updateAvatar,
    updateUserName,
    updateUserLang,
}
