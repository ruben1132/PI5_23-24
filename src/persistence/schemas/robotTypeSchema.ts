import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
        },

        type: {
            type: String,
            required: [true, 'Please enter a type for the robot type'],
            index: true,
        },

        brand: {
            type: String,
            required: [true, 'Please enter a brand for the robot type'],
        },

        model: {
            type: String,
            required: [true, 'Please enter a model for the robot type'],
        },
        tasksAvailable: {
            type: Array,
            required: [true, 'Please enter tasks available for the robot type'],
        },
    },
    { timestamps: true },
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
