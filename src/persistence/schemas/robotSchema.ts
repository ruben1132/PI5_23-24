import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';


const RobotSchema = new mongoose.Schema(
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

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
