const Project = require('../model/project-model')
const projectCltr = {};
//-------------------------------API for Project-------------------------------------------------------------
projectCltr.addProject = async (req, res) => {
    const body = req.body

    try {
        const newProject = new Project({ ...body, user: req.userId })
        const projectSave = await newProject.save();
        res.status(201).json({ message: "Project successfully added", projectSave })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
projectCltr.getAllProject = async (req, res) => {
    try {
        const projects = await Project.find().populate('user', ['email', 'name'])
        if (!projects) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json({ message: "List of Projects", projects })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
projectCltr.getById = async (req, res) => {
    const id = req.params.id
    try {
        const oneProject = await Project.findById({ _id: id })
        if (!oneProject) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json({ message: "The project you requested for", oneProject })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
projectCltr.update = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json({ message: "Project updated successfully", updatedProject })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}
projectCltr.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProject = await Project.findByIdAndDelete(id, { user: req.userId })
        if (!deleteProject) {
            return res.status(404).json({ error: "Project not found to delete" })
        }
        res.status(200).json({ message: "The project is deleted", deleteProject })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}

module.exports = projectCltr