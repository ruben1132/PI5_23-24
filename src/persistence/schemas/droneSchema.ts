import { IDronePersistence } from '../../dataschema/IDronePersistence';
import mongoose from 'mongoose';


const DroneSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },
        designation: {
            type: String,
            required: true
        },
        state: {
            type: Boolean,
            required: [true, 'Please enter a designation']
        },
        taskTypesAllowed: {
            type: [String],
            required: true
        },
    },
    { timestamps: true },
);

export default mongoose.model<IDronePersistence & mongoose.Document>('Drone', DroneSchema);
