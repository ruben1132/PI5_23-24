import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        number: {
            type: Number,
            required: [true, 'Please enter the number of this floor'],
        },

        building: {
            type: String,
            ref: 'Building',
        }

    },
    { timestamps: true },
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);


