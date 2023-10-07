"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
        index: true,
    },
    type: {
        type: String,
        default: 'clear',
    },
    assigned: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Drone' || 'Robot',
        required: [false],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Task', TaskSchema);
//# sourceMappingURL=taskSchema.js.map