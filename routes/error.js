const express = require('express');

const notFoundController = require('../controllers/error');

const router = express.Router();

router.get('/500',notFoundController.get500);
router.use(notFoundController.get404);

module.exports =  router;