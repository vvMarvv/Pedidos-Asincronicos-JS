const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const formController = require('../controllers/formController')

router.get('/', formController.form)

module.exports = router