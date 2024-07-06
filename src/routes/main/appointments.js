const express = require("express");
const router = express.Router();
const appointmentController = require("../../Controllers/appointmentsController");
const { authJwt, authAdmin } = require("../../../middleware");

// GET /api/appointments - Get all appointments
router.get("/", authJwt, authAdmin, appointmentController.getAllAppointments);

// GET /api/appointments/:id - Get details of a specific appointment by ID
router.get("/:id", authJwt, authAdmin, appointmentController.getAppointmentById);

// POST /api/appointments - Create a new appointment
router.post("/", authJwt, appointmentController.createAppointment);

// PUT /api/appointments/:id - Update details of a specific appointment by ID
router.put("/:id", authJwt, authAdmin, appointmentController.updateAppointment);

// DELETE /api/appointments/:id - Delete a specific appointment listing by ID
router.delete("/:id", authJwt, appointmentController.deleteAppointment);

module.exports = router;
