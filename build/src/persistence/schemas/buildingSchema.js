"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BuildingSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Building', BuildingSchema);
//# sourceMappingURL=buildingSchema.js.map