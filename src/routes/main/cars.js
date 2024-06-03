const express = require("express");
const router = express.Router();
const Car = require("../../models/Car");
const { authAdmin, authJwt } = require("../../../middleware");
//for testing purposes
// GET /api/cars - Get all cars
router.get("/all", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.log("Error on getting cars : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// GET /api/cars/:id - Get details of a specific car by ID
router.get("/:id", async (req, res) => {
  try {
    // Extract the car ID from the request parameters
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error on fetching car:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/cars - Add a new car listing
router.post("/add", authJwt, authAdmin, async (req, res) => {
  const { make, model, year, price, color, description } = req.body;
  try {
    const car = new Car({ make, model, year, price, color, description });
    await car.save();
    res.json({ message: "Car added successfully" });
  } catch (error) {
    console.log("Error on adding car : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// PUT /api/cars/:id - Update details of a specific car by ID
router.put("/:id", authJwt, authAdmin, async (req, res) => {
  const { make, model, year, price, color, description } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, {
      make,
      model,
      year,
      price,
      color,
      description,
    });
    res.json({ message: "Car updated successfully", car: car });
  } catch (error) {
    console.log("Error on updating car : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// DELETE /api/cars/:id - Delete a specific car listing by ID
router.delete("/:id", authJwt, authAdmin, (req, res) => {
  try {
    Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log("Error on deleting car : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = router;
