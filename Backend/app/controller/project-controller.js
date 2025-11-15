const { cloudinary } = require('../middleware/uploadMiddleware');
const Project = require('../model/project-model')
const projectCltr = {};
//-------------------------------API for add Project-------------------------------------------------------------
projectCltr.addProject = async (req, res) => {
    const body = req.body
    try {
        if (body.techStack) {
            body.techStack = JSON.parse(body.techStack);
        }
        const projectThumbNail = req.file ? req.file.path : undefined
        const newProject = new Project({ ...body, projectThumbNail, user: req.userId })
        const projectSave = await newProject.save();
        res.status(201).json({ message: "Project successfully added", projectSave })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
//-----------------------------Api to get all project----------------------------------------------------------
projectCltr.getAllProject = async (req, res) => {
    try {
        const projects = await Project.find().populate('user', ['email', 'name'])
        if (!projects) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json(projects)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
//---------------------------------API to get project by id-----------------------------------------------
projectCltr.getById = async (req, res) => {
    const id = req.params.id
    try {
        const oneProject = await Project.findById({ _id: id })
        if (!oneProject) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json(oneProject)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}
//----------------------------------API to update project---------------------------------------------------
projectCltr.update = async (req, res) => {
    const id = req.params.id;
    const body = { ...req.body }
    try {
        if (body.techStack) {
            body.techStack = JSON.parse(body.techStack);
        }
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ error: "Project not found" })
        }
        if (req.file && project.projectThumbNail) {
            const filename = project.projectThumbNail.split('/').slice(-1)[0].split('?')[0];
            const public_id = filename.split('.').slice(0, -1).join('.');
            await cloudinary.uploader.destroy(`portfolio/uploads/projects/${public_id}`)
            body.projectThumbNail = req.file.path
        }
        const updatedData = await Project.findByIdAndUpdate(id, body, { new: true })
        if (!updatedData) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json({ message: "Project details updated", updatedData })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}
projectCltr.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProject = await Project.findOneAndDelete( id, {user: req.userId })
        if (!deleteProject) {
            return res.status(404).json({ error: "Project not found to delete" })
        }
        if (deleteProject.projectThumbNail) {
            const filename = deleteProject.projectThumbNail.split('/').slice(-1)[0].split('?')[0];
            const public_id = filename.split('.').slice(0, -1).join('.');
            await cloudinary.uploader.destroy(`portfolio/uploads/projects/${public_id}`)
        }
        res.status(200).json(deleteProject)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}

module.exports = projectCltr