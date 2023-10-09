import { IPassagePersistence } from '../../dataschema/IPassagePersistence';
import mongoose from 'mongoose';

const PassageSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        designation: {
            type: String,
            required: true
        },

        fromBuilding: {
            type: String,
            ref: 'Building',
        },

        toBuilding: {
            type: String,
            ref: 'Building',
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', PassageSchema);


