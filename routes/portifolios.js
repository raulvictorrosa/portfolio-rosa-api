const express = require('express');
const router = express.Router();
const { getPortifolios } = require('../controllers/portifolios');

router.get('/', getPortifolios);

module.exports = router;
