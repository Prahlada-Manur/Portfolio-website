const User = require("../model/user-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userCltr = {};

userCltr.login = async (req, res) => {
  const body = req.body;

  try {
    let user = await User.findOne(); // Only 1 admin user

    // If no admin exists → create one
    if (!user) {
      const salt = await bcryptjs.genSalt();
      const hash = await bcryptjs.hash(body.password, salt);

      user = new User({
        email: body.email,
        password: hash,
        name: "Admin",
      });

      await user.save(); // FIXED THIS

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET, // This was undefined earlier
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        message: "Admin created successfully!",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }

    // Check if email is admin's
    if (body.email !== user.email) {
      return res
        .status(403)
        .json({ error: "Access denied. Only admin can login." });
    }

    // Validate password
    const isMatch = await bcryptjs.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = userCltr;
