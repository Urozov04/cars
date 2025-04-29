import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      trim: true,
      required: true,
    },
    slotNumber: {
      type: Number,
      required: true,
    },
    isBooked: {
      default: false,
      type: Boolean,
      required: true,
    },
    bookedBy: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    car: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: "car",
    },
    bookedAt: {
      default: null,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Parking = mongoose.model("parking", parkingSchema);
export default Parking;
