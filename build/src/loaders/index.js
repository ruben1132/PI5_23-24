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
    // "compare with the approach followed in repos and services" ' SO DA FORMA Q ESTA AND IDK WHY
    const userSchema = {
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const taskSchema = {
        name: 'taskSchema',
        schema: '../persistence/schemas/taskSchema',
    };
    const robotSchema = {
        name: 'robotSchema',
        schema: '../persistence/schemas/robotSchema',
    };
    const droneSchema = {
        name: 'droneSchema',
        schema: '../persistence/schemas/droneSchema',
    };
    const roomSchema = {
        name: 'roomSchema',
        schema: '../persistence/schemas/roomSchema',
    };
    const passageSchema = {
        name: 'passageSchema',
        schema: '../persistence/schemas/passageSchema',
    };
    const elevatorSchema = {
        name: 'droneSchema',
        schema: '../persistence/schemas/elevatorSchema',
    };
    const floorSchema = {
        name: 'floorSchema',
        schema: '../persistence/schemas/floorSchema',
    };
    const buildingSchema = {
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const buildingController = {
        name: config_1.default.controllers.building.name,
        path: config_1.default.controllers.building.path
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const buildingRepo = {
        name: config_1.default.repos.building.name,
        path: config_1.default.repos.building.path
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    const buildingService = {
        name: config_1.default.services.building.name,
        path: config_1.default.services.building.path
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
            roleController,
            buildingController
        ],
        repos: [
            roleRepo,
            userRepo,
            buildingRepo
        ],
        services: [
            roleService,
            buildingService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map