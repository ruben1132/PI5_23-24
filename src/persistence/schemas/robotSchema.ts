import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';


const RobotSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },
        identification: {
            type: String,
            required: true,
            unique: true
        },
        nickname: {
            type: String,
            required: true,
            unique: true
        },
        robotType: {
            type: String,
            required: true,
        },
        serialNumber: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        state: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
