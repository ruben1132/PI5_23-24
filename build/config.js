"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Function to get environment variables or use defaults
const getEnvVariable = (name, defaultValue) => {
    return process.env[name] || defaultValue;
};
exports.default = {
    // Your favorite port: optional change to 4000 by JRT
    port: parseInt(getEnvVariable('PORT', 4000), 10),
    // MongoDB connection URL
    databaseURL: getEnvVariable('MONGODB_URI', 'mongodb://mongoadmin:ca7408396943512431f6af8a@vsgate-s1.dei.isep.ipp.pt:10937/?authMechanism=SCRAM-SHA-1'),
    // Your secret sauce
    jwtSecret: getEnvVariable('JWT_SECRET', 'secret'),
    // Logging configuration
    logs: {
        level: getEnvVariable('LOG_LEVEL', 'info'),
    },
    // API configs
    api: {
        prefix: '/api',
    },
    // Controllers, Repos, Services, and Schemas
    controllers: {
        role: {
            name: "RoleController",
            path: "../controllers/roleController"
        },
        building: {
            name: "BuildingController",
            path: "../controllers/buildingController"
        }
    },
    repos: {
        role: {
            name: 'RoleRepo',
            path: '../repos/roleRepo',
        },
        user: {
            name: "UserRepo",
            path: "../repos/userRepo"
        },
        building: {
            name: "BuildingRepo",
            path: "../repos/buildingRepo"
        }
    },
    services: {
        role: {
            name: "RoleService",
            path: "../services/roleService"
        },
        building: {
            name: "BuildingService",
            path: "../services/buildingService"
        }
    },
    schemas: {
        user: {
            name: 'userSchema',
            schema: '../persistence/schemas/userSchema',
        },
        role: {
            name: 'roleSchema',
            schema: '../persistence/schemas/roleSchema',
        },
        task: {
            name: 'taskSchema',
            schema: '../persistence/schemas/taskSchema',
        },
        robot: {
            name: 'robotSchema',
            schema: '../persistence/schemas/robotSchema',
        },
        drone: {
            name: 'droneSchema',
            schema: '../persistence/schemas/droneSchema',
        },
        room: {
            name: 'roomSchema',
            schema: '../persistence/schemas/roomSchema',
        },
        passage: {
            name: 'passageSchema',
            schema: '../persistence/schemas/passageSchema',
        },
        elevator: {
            name: 'elevatorSchema',
            schema: '../persistence/schemas/elevatorSchema',
        },
        floor: {
            name: 'floorSchema',
            schema: '../persistence/schemas/floorSchema',
        },
        building: {
            name: 'buildingSchema',
            schema: '../persistence/schemas/buildingSchema',
        },
    },
};
//# sourceMappingURL=config.js.map