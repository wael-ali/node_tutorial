const express = require('express');

const notFoundController = require('../controllers/error');

const router = express.Router();

router.use(notFoundController.get404);

module.exports =  router;