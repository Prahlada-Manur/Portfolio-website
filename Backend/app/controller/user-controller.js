const User = require('../model/user-model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const userCltr = {};

userCltr.login = async (req, res) => {
    const body = req.body;

    try {
        let user = await User.findOne();

        if (!user) {
            const salt = await bcryptjs.genSalt();
            const hash = await bcryptjs.hash(body.password, salt);
            user = new User({
                email: body.email,
                password: hash,
                name: "Admin"
            });
            await user.save();
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(201).json({
                message: "Admin created successfully!",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
        }

        if (body.email !== user.email) {
            return res.status(403).json({ error: "Access denied. Only the admin can login." });
        }
        const isMatch = await bcryptjs.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = userCltr;
