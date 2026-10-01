import mongoose, { Schema, Model } from "mongoose";

interface ITopper {
  imageUrl: string;
  publicId: string;
  year: number;
  order: number;
}

const topperSchema = new Schema<ITopper>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Topper: Model<ITopper> =
  mongoose.models.Topper ||
  mongoose.model<ITopper>("Topper", topperSchema);

export default Topper;
