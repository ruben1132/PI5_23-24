"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Floor',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Room', RoomSchema);
//# sourceMappingURL=roomSchema.js.map