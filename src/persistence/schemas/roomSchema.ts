import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        number: {
            type: String,
            unique: true,
            required: [true, 'Please enter the number of the room'],
        },

        floor: {
            type: String,
            required: [true, 'Please enter the floor of the room'],
        },

    },
    { timestamps: true },
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);


