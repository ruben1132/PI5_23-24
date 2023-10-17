import { ITaskTypePersistence } from '../../dataschema/ITaskTypePersistence';
import mongoose from 'mongoose';

const TaskTypeSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
        },

        name: {
            type: String,
            required: [true, 'Please enter a name for the task type'],
            index: true,
        },

        description: {
            type: String,
            required: [true, 'Please enter a description for the task type'],
        },
    },
    { timestamps: true },
);

export default mongoose.model<ITaskTypePersistence & mongoose.Document>('TaskType', TaskTypeSchema);
