const express = require('express');
const router = express.Router();

const petController = require("./controller");

router.post('/api/pet', petController.createPet);
router.get('/api/pet', petController.getPet);
router.get('/api/pet/:petId', petController.getPetById);
router.patch('/api/pet/:petId', petController.updatePetById);
router.delete('/api/pet/:petId', petController.DeletePet);

module.exports = router; 