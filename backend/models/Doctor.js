import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    languages: {
      type: [String],
      required: true,
    },
    availability: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => {
          const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          return v.every((day) => validDays.includes(day))
        },
        message: (props) => `${props.value} contains invalid day(s)`,
      },
    },
    insurance: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=200&width=200",
    },
    bio: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create text index for search functionality
doctorSchema.index({
  name: "text",
  specialty: "text",
  location: "text",
})

const Doctor = mongoose.model("Doctor", doctorSchema)

export default Doctor
