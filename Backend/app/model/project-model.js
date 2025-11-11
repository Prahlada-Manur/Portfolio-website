const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    shortBio: {
        type: String,
        required: true
    },
    projectThumbNail: {
        type: String
    },
    longBio: { type: String, required: true },
    techStack: {
        type: [String],
        default: []
    },
    projectUrl: { type: String, required: true },
    repourl: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })
const Project = mongoose.model('Project', projectSchema)
module.exports = Project