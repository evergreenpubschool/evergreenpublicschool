import mongoose, { Model, Schema } from "mongoose";

interface IGalleryEvent {
  title: string;
  imageUrl: string;
  publicId: string;
  googlePhotosUrl: string;
  order: number;
}

const galleryEventSchema = new Schema<IGalleryEvent>(
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

    googlePhotosUrl: {
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

const GalleryEvent: Model<IGalleryEvent> =
  mongoose.models.GalleryEvent ||
  mongoose.model<IGalleryEvent>("GalleryEvent", galleryEventSchema);

export default GalleryEvent;