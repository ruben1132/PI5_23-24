import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        code: {
            type: String,
            required: [true, 'Please enter the code of the building'],
        },

        name: {
            type: String,
            required: false,
        },
        
        dimensions: {
            type: String,
            required: [true, 'Please enter the dimensions of the building'],
        },

    },
    { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);


