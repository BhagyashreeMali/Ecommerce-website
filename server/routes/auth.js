const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const circleAvatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user with a default profile
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            profiles: [
                {
                    name: "Kids",
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Netflix_2015_N_logo.svg", // Placeholder for actual Kids icon
                    myList: []
                },
                {
                    name: req.body.email.split('@')[0], // Default name from email
                    avatar: circleAvatar,
                    myList: []
                }
            ]
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password!");

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        );

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
