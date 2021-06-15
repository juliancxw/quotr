const express = require('express')
const router = express.Router()
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
  } = require('../middlewares/authentication')
const projectController = require('../controllers/project_controller')


// Create New Project Form
router.get('/new', projectController.new)

// Create New Project
router.post('/new',  projectController.newProject)

// Form to upload drawings for new project
router.get('/upload',  projectController.uploadForm)

// Upload drawings to forge
router.post('/upload',  projectController.uploadFiles)

module.exports = router