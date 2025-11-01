const About = require('../model/about-model');
const upload = require('../middleware/uploadMiddleware');
const aboutCltr = {};

//---------------------------------------API for About----------------------------------------------------------------
aboutCltr.addAbout = async (req, res) => {
    try {
        const existing = await About.findOne({ user: req.userId })
        if (existing) {
            return res.status(400).json({ error: "Update insted of Add" })
        }
        const about = new About({ ...req.body, user: req.userId })
        const saveAbout = await about.save();
        res.status(201).json({ message: "About Information Created", saveAbout })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" })
    }
}
aboutCltr.update = async (req, res) => {
    try {
        const updateAbout = await About.findOneAndUpdate({ user: req.userId }, { ...req.body }, { new: true })
        if (!updateAbout) {
            return res.status(404).json({ error: "Info not found" })
        }
        res.status(200).json({ message: "Data updated Successfully", updateAbout })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
aboutCltr.getAbout = async (req, res) => {
    try {
        const getAbout = await About.findOne().populate('user', ['email', 'name'])
        if (!getAbout) {
            return res.status(404).json({ error: "Info not found" })
        }
        res.status(200).json({ message: "Information", getAbout })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })

    }
}
//------------------------------API for upload portfolio pic and resume---------------------------------------------
aboutCltr.uploadProfilePic = async (req, res) => {
    console.log("req.files", req.file);
    if (!req.file) {
        return res.status(400).json({ error: "Please upload a profile picture" });
    }

    try {
        const about = await About.findOneAndUpdate(
            { user: req.userId },
            { portfolioPicUrl: req.file.path },
            { new: true }
        );

        if (!about) {
            return res.status(404).json({ error: "About info not found" });
        }

        res.status(200).json({ message: "Profile picture uploaded successfully", about });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

aboutCltr.uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Please upload a resume" });
    }

    try {
        const about = await About.findOneAndUpdate(
            { user: req.userId },
            { resumeLink: req.file.path },
            { new: true }
        );

        if (!about) {
            return res.status(404).json({ error: "About info not found" });
        }

        res.status(200).json({ message: "Resume uploaded successfully", about });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = aboutCltr