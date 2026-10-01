import mongoose, { Schema, Model } from "mongoose";

interface IManagement {
  name: string;
  designation: string;
  imageUrl: string;
  publicId: string;
  order: number;
}

const managementSchema = new Schema<IManagement>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
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
  { timestamps: true }
);

const Management: Model<IManagement> =
  mongoose.models.Management ||
  mongoose.model<IManagement>("Management", managementSchema);

export default Management;