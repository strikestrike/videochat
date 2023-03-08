const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "can't be blank"],
        },
        username: { type: String },
        password: { type: String, required: [true, "can't be blank"] },

        image: { type: String },
        languages: { type: Array, "default": [] },
        friends: [{ type: String, ref: "User" }],
        // groupChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
