const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const favController = require('../controllers/favController')

router.get('/', favController.fav)

module.exports = router