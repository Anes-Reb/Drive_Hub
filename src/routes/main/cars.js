const router = require("express").Router();
const Car = require("../../models/Car");
const { authAdmin, authJwt } = require("../../../middleware");

// GET /cars - Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.render("cars-list", { cars: cars });
  } catch (error) {
    console.log("Error on getting cars : ", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

// GET /cars/:id - Get details of a specific car by ID
router.get("/:id", async (req, res) => {
  try {
    // Extract the car ID from the request parameters
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.render("car", { car: car });
  } catch (error) {
    console.error("Error on fetching car:", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

// POST /cars - Add a new car listing
router.post("/add", authJwt, authAdmin, async (req, res) => {
  const car = req.body;
  if (!car.make || !car.model || !car.year || !car.price || !car.color || !car.description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newCar = await Car.create(car);
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.log("Error on adding car : ", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

// PUT /cars/:id - Update details of a specific car by ID
router.put("/:id", authJwt, authAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car updated successfully", car });
  } catch (error) {
    console.log("Error updating car:", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});
// DELETE /cars/:id - Delete a specific car listing by ID
router.delete("/:id", authJwt, authAdmin, (req, res) => {
  try {
    Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log("Error on deleting car : ", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

module.exports = router;
