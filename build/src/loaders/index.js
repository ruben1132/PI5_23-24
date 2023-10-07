"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    // SO DA DESTA FORMA IDK WHY
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const taskSchema = {
        // compare with the approach followed in repos and services
        name: 'taskSchema',
        schema: '../persistence/schemas/taskSchema',
    };
    const robotSchema = {
        // compare with the approach followed in repos and services
        name: 'robotSchema',
        schema: '../persistence/schemas/robotSchema',
    };
    const droneSchema = {
        // compare with the approach followed in repos and services
        name: 'droneSchema',
        schema: '../persistence/schemas/droneSchema',
    };
    const roomSchema = {
        // compare with the approach followed in repos and services
        name: 'roomSchema',
        schema: '../persistence/schemas/roomSchema',
    };
    const passageSchema = {
        // compare with the approach followed in repos and services
        name: 'passageSchema',
        schema: '../persistence/schemas/passageSchema',
    };
    const elevatorSchema = {
        // compare with the approach followed in repos and services
        name: 'droneSchema',
        schema: '../persistence/schemas/elevatorSchema',
    };
    const floorSchema = {
        // compare with the approach followed in repos and services
        name: 'floorSchema',
        schema: '../persistence/schemas/floorSchema',
    };
    const buildingSchema = {
        // compare with the approach followed in repos and services
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            taskSchema,
            robotSchema,
            droneSchema,
            roomSchema,
            passageSchema,
            elevatorSchema,
            floorSchema,
            buildingSchema
        ],
        controllers: [
            roleController
        ],
        repos: [
            roleRepo,
            userRepo
        ],
        services: [
            roleService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map