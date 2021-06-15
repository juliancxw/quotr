const express = require('express')
const router = express.Router()
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
  } = require('../middlewares/authentication')
const dashboardController = require('../controllers/dashboard_controller')

// main page
router.get('/', authenticatedOnlyMiddleware, dashboardController.main)

module.exports = router