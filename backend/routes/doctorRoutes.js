import express from "express"
import Doctor from "../models/Doctor.js"

const router = express.Router()

/**
 * @route   GET /api/doctors
 * @desc    Get doctors with filters and pagination
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      specialty,
      gender,
      insurance,
      language,
      availability,
      maxDistance,
      search,
    } = req.query

    // Build filter query
    const filter = {}

    // Text search
    if (search) {
      filter.$text = { $search: search }
    }

    // Specialty filter
    if (specialty) {
      filter.specialty = specialty
    }

    // Gender filter
    if (gender) {
      filter.gender = gender
    }

    // Insurance filter
    if (insurance) {
      filter.insurance = insurance
    }

    // Language filter
    if (language) {
      filter.languages = language
    }

    // Availability filter
    if (availability) {
      filter.availability = availability
    }

    // Distance filter
    if (maxDistance) {
      filter.distance = { $lte: Number(maxDistance) }
    }

    // Execute query with pagination
    const doctors = await Doctor.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(search ? { score: { $meta: "textScore" } } : { rating: -1 })

    // Get total count for pagination
    const total = await Doctor.countDocuments(filter)

    res.json({
      doctors,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

/**
 * @route   POST /api/doctors
 * @desc    Add a new doctor
 * @access  Private (in a real app, this would be protected)
 */
router.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body)
    const savedDoctor = await newDoctor.save()
    res.status(201).json(savedDoctor)
  } catch (error) {
    console.error("Error adding doctor:", error)

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      })
    }

    res.status(500).json({ message: "Server error", error: error.message })
  }
})

/**
 * @route   GET /api/doctors/:id
 * @desc    Get doctor by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" })
    }

    res.json(doctor)
  } catch (error) {
    console.error("Error fetching doctor:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export const doctorRoutes = router
