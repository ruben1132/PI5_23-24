import { ITaskPersistence } from '../../dataschema/ITaskPersistence';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        designation: {
            type: String,
            required: [true, 'Please enter a designation'],
            index: true,
        },

        type: {
            type: String,
            default: 'clear',
        },

        assigned: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ITaskPersistence & mongoose.Document>('Task', TaskSchema);


