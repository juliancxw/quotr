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
router.get('/new', authenticatedOnlyMiddleware, projectController.new)

// Create New Project
router.post('/new', authenticatedOnlyMiddleware, projectController.newProject)

// Form to upload drawings for new project
router.get('/upload', authenticatedOnlyMiddleware, projectController.uploadForm)

// Upload drawings to forge
router.post('/upload', upload.single('fileToUpload'), projectController.uploadFiles)

// Quotr Form
router.get('/quotr', authenticatedOnlyMiddleware, projectController.quotr)

// update BOQ
router.post('/update_boq', authenticatedOnlyMiddleware, projectController.updateBOQ)

// delete
router.delete('/:id', authenticatedOnlyMiddleware, projectController.delete)

// publish
router.post('/publish', authenticatedOnlyMiddleware, projectController.publish)


// Cnstr Form
router.get('/cnstr', authenticatedOnlyMiddleware, projectController.cnstr)

module.exports = router