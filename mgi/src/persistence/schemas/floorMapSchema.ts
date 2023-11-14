import { IFloorMapPersistence } from '../../dataschema/IFloorMapPersistence';
import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema(
    {
        width: { type: Number, required: true },
        height: { type: Number },
        depth: { type: Number, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const positionSchema = new mongoose.Schema(
    {
        positionX: { type: Number, required: true },
        positionY: { type: Number, required: true },
        direction: { type: String, required: true },
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
        color: { type: colorMapSchema, required: true },
        ao: { url: { type: String, required: true }, intensity: { type: Number, required: true } },
        displacement: {
            url: { type: String, required: true },
            scale: { type: Number, required: true },
            bias: { type: Number, required: true },
        },
        normal: {
            url: { type: String, required: true },
            type: { type: Number, required: true },
            scale: { type: sizeSchema, required: true },
        },
        bump: { url: { type: String, required: true }, scale: { type: Number, required: true } },
        roughness: { url: { type: String, required: true }, rough: { type: Number, required: true } },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const groundWallSchema = new mongoose.Schema(
    {
        size: { type: sizeSchema, required: true },
        segments: { type: sizeSchema, required: true },
        primaryColor: { type: String, required: true },
        maps: { type: mapsSchema, required: true },
        wrapS: { type: Number, required: true },
        wrapT: { type: Number, required: true },
        repeat: { type: sizeSchema, required: true },
        magFilter: { type: Number, required: true },
        minFilter: { type: Number, required: true },
        secondaryColor: { type: String, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmDoorsSchema = new mongoose.Schema(
    {
        location: { type: positionSchema, required: true },
    },
    {
        _id: false, // Disable _id for this subdocument
    },
);

const fmElevatorSchema = new mongoose.Schema(
    {
        elevatorId: { type: String, required: true },
        location: { type: positionSchema, required: true },
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
        location: { type: positionSchema, required: true },
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
