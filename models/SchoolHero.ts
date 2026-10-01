import mongoose, { Schema, Model } from "mongoose";

interface ISchoolHero {
  imageUrl: string;
  publicId: string;
}

const schoolHeroSchema = new Schema<ISchoolHero>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SchoolHero: Model<ISchoolHero> =
  mongoose.models.SchoolHero ||
  mongoose.model<ISchoolHero>("SchoolHero", schoolHeroSchema);

export default SchoolHero;