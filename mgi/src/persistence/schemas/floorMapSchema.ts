import { IFloorMapPersistence } from '../../dataschema/IFloorMapPersistence';
import mongoose from 'mongoose';

const fmRoomSchema = new mongoose.Schema({
    roomId: String,
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
});

const fmDoorSchema = new mongoose.Schema({
    positionX: Number,
    positionY: Number,
    direction: String,
});

const fmElevatorSchema = new mongoose.Schema({
    elevatorId: String,
    positionX: Number,
    positionY: Number,
    direction: String,
});

const fmPassageSchema = new mongoose.Schema({
    passageId: String,
    positionX: Number,
    positionY: Number,
    direction: String,
});


const FloorMap = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        floor: {
            type: String,
            required: [true, 'Please select an existing floor'],
        },

        map: {
            type: [[Number]],
            required: [true, 'Please enter the floor map matrix'],
        },

        fmRooms: {
            type: [fmRoomSchema],
            required: [true, 'Please select existing rooms'],
        },

        fmDoors: {
            type: [fmDoorSchema],
            required: [true, 'Please enter doors'],
        },

        fmElevator: {
            type: fmElevatorSchema,
            required: [true, 'Please select an existing elevator'],
        },

        fmPassages: {
            type: [fmPassageSchema],
            required: [true, 'Please select existing passages'],
        },

        wallTexture: {
            type: String,
            required: [true, 'Please enter the wall texture'],
        },

        groundTexture: {
            type: String,
            required: [true, 'Please enter the ground texture'],
        },

        doorTexture: {
            type: String,
            required: [true, 'Please enter the door texture'],
        },

        elevatorTexture: {
            type: String,
            required: [true, 'Please enter the elevator texture'],
        },



    },
    { timestamps: true },
);

export default mongoose.model<IFloorMapPersistence & mongoose.Document>('FloorMap', FloorMap);


