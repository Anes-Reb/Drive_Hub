const express = require("express");
const router = express.Router();
const Appointment = require("../../models/Appointment");
const { authAdmin, authJwt } = require("../../../middleware");

// GET /api/appointments - Get all appointments
router.get("/", authJwt, authAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.log("Error on getting appointments : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// GET /api/appointments/:id - Get details of a specific appointment by ID
router.get("/:id", authJwt, async (req, res) => {
  try {
    // Extract the appointment ID from the request parameters
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Error on fetching appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/appointments/:id - Update details of a specific appointment by ID
router.put("/:id", authJwt, authAdmin, async (req, res) => {
  const { status, additionalNotes } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
      status,
      additionalNotes,
    });
    res.json({ message: "Appointment updated successfully", appointment: appointment });
  } catch (error) {
    console.log("Error on updating appointment : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

// DELETE /api/appointments/:id - Delete a specific appointment listing by ID
router.delete("/:id", authJwt, (req, res) => {
  try {
    Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.log("Error on deleting appointment : ", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = router;
