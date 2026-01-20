const router = require('express').Router();
const User = require('../models/User');
const verify = require('../verifyToken');

// GET USER (with all profiles)
router.get("/find/:id", verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADD PROFILE
router.post("/:id/profile", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            user.profiles.push(req.body); // Expects { name: "...", avatar: "..." }
            const updatedUser = await user.save();
            const { password, ...info } = updatedUser._doc;
            res.status(200).json(info);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only update your own account!");
    }
});

module.exports = router;
