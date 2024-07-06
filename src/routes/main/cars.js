const router = require("express").Router();

const { authJwt, authAdmin } = require("../../../middleware");
const CarController = require('../../controllers/carsController');

router.get('/', CarController.getAllCars);
router.get('/:id', CarController.getCarById);
router.post('/add',authJwt,authAdmin, CarController.createCar);
router.put('/:id',authJwt,authAdmin, CarController.updateCar);
router.delete('/:id', CarController.deleteCar);

module.exports = router