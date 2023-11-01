import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        designation: {
            type: String,
            required: [true, 'Please enter a designation'],
        },

        floorsAllowed: {
            type: [String],
            required: [true, 'Please select the floors allowed for this elevator'],
        },

    },
    { timestamps: true },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);


