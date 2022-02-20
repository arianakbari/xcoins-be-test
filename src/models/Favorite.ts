import mongoose from "mongoose";

const { Schema } = mongoose;

export interface IFavorite extends mongoose.Document {
    profile: mongoose.Types.ObjectId;
    name: string;
    favorites: string[];
}

const schema = new Schema(
  {
    profile: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    favorites: [{
      type: String,
      required: true,
      trim: true
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFavorite>("Favorite", schema);
