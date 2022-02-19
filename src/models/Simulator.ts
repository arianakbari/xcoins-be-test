import mongoose from "../databases/mongodb";

const { Schema } = mongoose;

export interface ISimulator extends mongoose.Document {
    profile: mongoose.Types.ObjectId;
    dateRecorded: Date;
    cryptocurrency: string;
    euros: number;
    price: number;
    quantity: number;
}

const schema = new Schema(
    {
        profile: {
            type: mongoose.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        dateRecorded: {
            type: Date,
            required: true,
        },
        cryptocurrency: {
            type: String,
            trim: String,
            required: true,
        },
        euros: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ISimulator>("Simulator", schema);