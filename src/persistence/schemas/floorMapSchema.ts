import { IFloorMapSchemaPersistence } from '../../dataschema/IFloorMapPersistence';
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomId: String,
    positionX: Number,
    positionY: Number,
    width: Number,
    height: Number,
});

const doorSchema = new mongoose.Schema({
    positionX: Number,
    positionY: Number,
    width: Number,
    height: Number,
    direction: String,
});

const elevatorSchema = new mongoose.Schema({
    elevatorId: String,
    positionX: Number,
    positionY: Number,
    direction: String,
});

const passageSchema = new mongoose.Schema({
    passageId: String,
    positionX: Number,
    positionY: Number,
    direction: String,
});


const FloorMapSchemaSchema = new mongoose.Schema(
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

        rooms: {
            type: [roomSchema],
            required: [true, 'Please select existing rooms'],
        },

        doors: {
            type: [doorSchema],
            required: [true, 'Please enter doors'],
        },

        elevator: {
            type: elevatorSchema,
            required: [true, 'Please select an existing elevator'],
        },

        passages: {
            type: [passageSchema],
            required: [true, 'Please select existing passages'],
        },

    },
    { timestamps: true },
);

export default mongoose.model<IFloorMapSchemaPersistence & mongoose.Document>('FloorMapSchema', FloorMapSchemaSchema);


