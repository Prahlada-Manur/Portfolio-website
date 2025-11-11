const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3090
const app = express();
app.use(express.json());
app.use(cors())
//-----------------------------------------------------------------------------------------
const configDB = require('./config/configDB');
const userCltr = require('./app/controller/user-controller');
const projectCltr = require('./app/controller/project-controller')
const aboutCltr = require('./app/controller/about-controller')
const authenticateUser = require('./app/middleware/authenticateUser')
const {upload} = require('./app/middleware/uploadMiddleware')
configDB();
//------------------------------------------------------------------------------------------
app.post('/api/login', userCltr.login)  //admin login to edit
app.post('/api/project', authenticateUser,upload.single('projectThumbNail'), projectCltr.addProject) // admin add project
app.get('/api/projects', projectCltr.getAllProject) // get all project to display
app.get('/api/project/:id', projectCltr.getById) //get one project
app.put('/api/project/:id', authenticateUser,upload.single('projectThumbNail'), projectCltr.update)
app.delete('/api/project/:id', authenticateUser, projectCltr.delete)
app.post('/api/about', authenticateUser, aboutCltr.addAbout)
app.put('/api/about', authenticateUser, aboutCltr.update)
app.get('/api/about', aboutCltr.getAbout)
app.post('/api/uploadPic', authenticateUser,upload.single('portfolioPicUrl'), aboutCltr.uploadProfilePic);
app.post('/api/upload/resume', authenticateUser,upload.single('resumeLink'), aboutCltr.uploadResume)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})