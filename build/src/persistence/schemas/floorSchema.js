"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FloorSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    number: {
        type: Number,
        required: [true, 'Please enter the number of this floor'],
    },
    building: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Building',
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Floor', FloorSchema);
//# sourceMappingURL=floorSchema.js.map