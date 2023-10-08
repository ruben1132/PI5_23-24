"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
exports.default = async () => {
    mongoose_1.default.set('strictQuery', false);
    try {
        const connection = await mongoose_1.default.connect(config_1.default.databaseURL);
        console.log('Connected to MongoDB');
        return connection.connection.db;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
    // const connection = await mongoose.connect(config.databaseURL);
    // return connection.connection.db;
};
//# sourceMappingURL=mongoose.js.map