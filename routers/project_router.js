const express = require('express')
const router = express.Router()
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
  } = require('../middlewares/authentication')
const projectController = require('../controllers/project_controller')
const multer = require('multer');         // To handle file upload
const upload = multer({ dest: 'tmp/' }); // Save file into local /tmp folder


// Create New Project Form
router.get('/new', projectController.new)

// Create New Project
router.post('/new',  projectController.newProject)

// Form to upload drawings for new project
router.get('/upload',  projectController.uploadForm)

// Upload drawings to forge
router.post('/upload', upload.single('fileToUpload'), projectController.uploadFiles)

// Quotr Form
router.get('/quotr',  projectController.quotr)

// update BOQ
router.post('/update_boq', projectController.updateBOQ)

// delete
router.delete('/:id', projectController.delete)

module.exports = router