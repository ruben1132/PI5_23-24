"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ElevatorSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    },
    building: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Building',
    },
    floorsAllowed: {
        type: [Number],
        required: [true, 'Please select the floors allowed for this elevator'],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Elevator', ElevatorSchema);
//# sourceMappingURL=elevatorSchema.js.map