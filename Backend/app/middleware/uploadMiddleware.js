const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//------------------------------------------------------------------------------------------------------------------
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
//--------------------------------------------------------------------------------------------------------------------
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folderPath = 'portfolio/uploads';
        if (file.fieldname === 'portfolioPicUrl' || file.fieldname === 'resumeLink') {
            folderPath = `${folderPath}/about`
        } else if (file.fieldname === 'projectThumbNail') {
            folderPath = `${folderPath}/projects`
        }
        return {
            folder: folderPath,
            resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
            allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
            public_id: `${file.fieldname}-${Date.now()}`

        }
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }
})
module.exports = { upload, cloudinary }