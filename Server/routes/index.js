const express = require('express');
const HomeController = require('../controllers/homecontroller');

const router  = express.Router()

router.post("/checkwebsite", HomeController.checkwebsite);

module.exports = router;