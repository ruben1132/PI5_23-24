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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Building',
        },

        toBuilding: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Building',
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', PassageSchema);


