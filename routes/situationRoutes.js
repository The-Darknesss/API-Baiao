const express = require('express');
const router = express.Router();
const SituationController = require('../controllers/SituationController');

router.post('/situations', SituationController.create);
router.get('/situations', SituationController.getAll);
router.get('/situations/:id', SituationController.getById);
router.put('/situations/:id', SituationController.update);
router.delete('/situations/:id', SituationController.delete);

module.exports = router;