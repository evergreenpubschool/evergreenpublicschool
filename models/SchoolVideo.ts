import mongoose, { Schema, Model } from "mongoose";

interface ISchoolVideo {
  youtubeUrl: string;
}

const schoolVideoSchema = new Schema<ISchoolVideo>(
  {
    youtubeUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SchoolVideo: Model<ISchoolVideo> =
  mongoose.models.SchoolVideo ||
  mongoose.model<ISchoolVideo>("SchoolVideo", schoolVideoSchema);

export default SchoolVideo;