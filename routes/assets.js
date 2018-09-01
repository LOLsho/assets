const express = require('express');
const router = express.Router();
const controller = require('../controllers/assets');

router.get('/get-one', controller.getOne);
router.get('/get-all', controller.getAll);
router.get('/get-bonds', controller.getBonds);
router.get('/get-etfs', controller.getEtfs);
router.get('/get-shares', controller.getShares);


router.post('/add', controller.addAsset);



module.exports = router;