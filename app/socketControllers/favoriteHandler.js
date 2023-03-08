const User = require("../models/User");

const addFavorite = async ({ socket, userInfo }) => {
    try {
        const user = await User.findById(userInfo.userId);
        if (!user) {
            return res.status(404).send("The id: " + userInfo.userId + " is invalid");
        }

        if (user.friends.indexOf(userInfo.userId) != -1) {
            user.friends.push(userInfo.userId);
            await user.save();
        }
    } catch (err) {
        console.log(err);
    }
};

const removeFavorite = async ({ socket, userInfo }) => {
    try {
        const user = await User.findById(userInfo.userId);
        if (!user) {
            return res.status(404).send("The id: " + userInfo.userId + " is invalid");
        }

        const index = user.friends.indexOf(userInfo.userId);
        if (index > -1) {
            user.friends.splice(index, 1);
            await user.save();
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
};