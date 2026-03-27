const express = require('express');
const router = express.Router();
const ProductSituationController = require('../controllers/ProductSituationController');

router.post('/product-situations', ProductSituationController.create);
router.get('/product-situations', ProductSituationController.getAll);
router.get('/product-situations/:id', ProductSituationController.getById);
router.put('/product-situations/:id', ProductSituationController.update);
router.delete('/product-situations/:id', ProductSituationController.delete);

module.exports = router;