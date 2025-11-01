const User = require('../model/user-model');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const userCltr = {};

userCltr.login = async (req, res) => {
    const body = req.body;
    try {
        let user = await User.findOne({ email: body.email })
        if (!user) {
            const salt = await bcryptjs.genSalt();
            const hash = await bcryptjs.hash(body.password, salt)
            user = new User({
                email: body.email,
                password: hash,
                name: 'Admin'
            })
            await user.save();
            const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            return res.status(201).json({
                message: "Admin created Successfully", token, user: {
                    id: user._id,
                    email: user.email,
                    password: user.password
                }
            })
        }
        const isMatch = await bcryptjs.compare(body.password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }

}

module.exports = userCltr