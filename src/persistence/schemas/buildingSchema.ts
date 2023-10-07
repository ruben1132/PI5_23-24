import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        designation: {
            type: String,
            required: [true, 'Please enter a designation'],
        }

    },
    { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);


