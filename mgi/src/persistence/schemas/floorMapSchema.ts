import { IFloorMapPersistence } from '../../dataschema/IFloorMapPersistence';
import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema(
    {
        width: { type: Number, required: false },
        height: { type: Number,  required: false  },
        depth: { type: Number, required: false },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const positionSchema = new mongoose.Schema(
    {
        positionX: { type: Number, required: true },
        positionY: { type: Number, required: true },
        direction: { type: String, required: false },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const colorMapSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const mapsSchema = new mongoose.Schema(
    {
        color: { type: colorMapSchema, required: false },
        ao: { url: { type: String, required: false }, intensity: { type: Number, required: false } },
        displacement: {
            url: { type: String, required: false },
            scale: { type: Number, required: false },
            bias: { type: Number, required: false },
        },
        normal: {
            url: { type: String, required: false },
            type: { type: Number, required: false },
            scale: { type: sizeSchema, required: false },
        },
        bump: { url: { type: String, required: false }, scale: { type: Number, required: false } },
        roughness: { url: { type: String, required: false }, rough: { type: Number, required: false } },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const groundWallSchema = new mongoose.Schema(
    {
        size: { type: sizeSchema, required: false },
        segments: { type: sizeSchema, required: true },
        primaryColor: { type: String, required: false },
        maps: { type: mapsSchema, required: true },
        wrapS: { type: Number, required: true },
        wrapT: { type: Number, required: true },
        repeat: { type: sizeSchema, required: true },
        magFilter: { type: Number, required: true },
        minFilter: { type: Number, required: true },
        secondaryColor: { type: String, required: false },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmDoorsSchema = new mongoose.Schema(
    {
        position: { type: positionSchema, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmElevatorSchema = new mongoose.Schema(
    {
        elevatorId: { type: String, required: true },
        position: { type: positionSchema, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmRoomsSchema = new mongoose.Schema(
    {
        roomId: { type: String, required: true },
        startX: { type: Number, required: true },
        startY: { type: Number, required: true },
        endX: { type: Number, required: true },
        endY: { type: Number, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmPassagesSchema = new mongoose.Schema(
    {
        passageId: { type: String, required: true },
        position: { type: positionSchema, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const FloorMap = new mongoose.Schema(
    {
        domainId: { type: String },
        floor: { type: String, required: true },
        maze: {
            size: { type: sizeSchema, required: true },
            map: { type: [[Number]], required: true },
            exitLocation: { type: [Number], required: true },
        },
        ground: { type: groundWallSchema, required: true },
        wall: { type: groundWallSchema, required: true },
        player: {
            initialPosition: { type: [Number], required: true },
            initialDirection: { type: Number, required: true },
        },
        fmDoors: { type: [fmDoorsSchema] },
        fmElevator: { type: fmElevatorSchema },
        fmRooms: { type: [fmRoomsSchema] },
        fmPassages: { type: [fmPassagesSchema] },
    },
    { timestamps: true },
);

export default mongoose.model<IFloorMapPersistence & mongoose.Document>('FloorMap', FloorMap);
