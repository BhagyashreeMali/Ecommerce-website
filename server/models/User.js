const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" },
    myList: [{ type: String }] // Array of movie IDs
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profiles: [ProfileSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
