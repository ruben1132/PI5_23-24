import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        number: {
            type: Number,
            min: 1,
            index: true,
        },

        floor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Floor',
        },

    },
    { timestamps: true },
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);


