const mongoose = require('mongoose')
const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    skills: [{ type: String }],
    contactMe: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        linkdIn: {
            type: String,
            required: true
        },
        gitHub: {
            type: String,
            required: true
        }
    },
    portfolioPicUrl: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    resumeLink: {
        type: String
    }
}, { timestamps: true })
const About = mongoose.model('About', aboutSchema);
module.exports = About