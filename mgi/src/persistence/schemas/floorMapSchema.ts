import { IFloorMapPersistence } from '../../dataschema/IFloorMapPersistence';
import mongoose from 'mongoose';


const FloorMap = new mongoose.Schema(
    {
        domainId: { type: String },
        floor: { type: String, required: true },
        file: { type: String, required: true },
    },
    { timestamps: true },
);

export default mongoose.model<IFloorMapPersistence & mongoose.Document>('FloorMap', FloorMap);