import mongoose, { Schema, models } from "mongoose";

const infrastructureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Infrastructure =
  models.Infrastructure ||
  mongoose.model("Infrastructure", infrastructureSchema);

export default Infrastructure;
