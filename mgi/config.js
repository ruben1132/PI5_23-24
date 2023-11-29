import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Function to get environment variables or use defaults
const getEnvVariable = (name, defaultValue) => {
    return process.env[name] || defaultValue;
};

export default {
    // Your favorite port: optional change to 80 by JRT
    // port: parseInt(getEnvVariable('PORT', 8080), 10),
    port: parseInt(getEnvVariable('PORT', 2225), 10),

    // MongoDB connection URL
    databaseURL: getEnvVariable(
        'MONGODB_URI',
        'mongodb://mongoadmin:ca7408396943512431f6af8a@vsgate-s1.dei.isep.ipp.pt:10937/?authMechanism=SCRAM-SHA-1',
    ),

    // cookie name
    cookieName: 'mgiAPI:authCookie',

    // Your secret sauce
    jwtSecret: getEnvVariable('JWT_SECRET', 'secret'),

    // client URL
    clientURL: getEnvVariable('CLIENT_URL', 'http://localhost:2223'),

    // MP API
    mpAPI: getEnvVariable('MP_API', 'http://localhost:5000'),

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
            name: 'RoleController',
            path: '../controllers/roleController',
        },
        building: {
            name: 'BuildingController',
            path: '../controllers/buildingController',
        },
        elevator: {
            name: 'ElevatorController',
            path: '../controllers/elevatorController',
        },
        floor: {
            name: 'FloorController',
            path: '../controllers/floorController',
        },
        floorMap: {
            name: 'FloorMapController',
            path: '../controllers/floorMapController',
        },
        passage: {
            name: 'PassageController',
            path: '../controllers/passageController',
        },
        taskType: {
            name: 'TaskTypeController',
            path: '../controllers/taskTypeController',
        },
        robotType: {
            name: 'RobotTypeController',
            path: '../controllers/robotTypeController',
        },
        floor: {
            name: 'FloorController',
            path: '../controllers/floorController',
        },
        room: {
            name: 'RoomController',
            path: '../controllers/roomController',
        },
        robot: {
            name: 'RobotController',
            path: '../controllers/robotController',
        },
        user: {
            name: 'UserController',
            path: '../controllers/userController',
        },
        auth: {
            name: 'AuthController',
            path: '../controllers/authController',
        },
        planning: {
            name: 'PlanningController',
            path: '../controllers/planningController',
        },
    },

    repos: {
        role: {
            name: 'RoleRepo',
            path: '../repos/roleRepo',
        },
        user: {
            name: 'UserRepo',
            path: '../repos/userRepo',
        },
        building: {
            name: 'BuildingRepo',
            path: '../repos/buildingRepo',
        },
        elevator: {
            name: 'ElevatorRepo',
            path: '../repos/elevatorRepo',
        },
        floor: {
            name: 'FloorRepo',
            path: '../repos/floorRepo',
        },
        floorMap: {
            name: 'FloorMapRepo',
            path: '../repos/floorMapRepo',
        },
        passage: {
            name: 'PassageRepo',
            path: '../repos/passageRepo',
        },
        room: {
            name: 'RoomRepo',
            path: '../repos/roomRepo',
        },
        taskType: {
            name: 'TaskTypeRepo',
            path: '../repos/taskTypeRepo',
        },
        robotType: {
            name: 'RobotTypeRepo',
            path: '../repos/robotTypeRepo',
        },
        robot: {
            name: 'RobotRepo',
            path: '../repos/robotRepo',
        },
    },

    services: {
        role: {
            name: 'RoleService',
            path: '../services/roleService',
        },
        building: {
            name: 'BuildingService',
            path: '../services/buildingService',
        },
        elevator: {
            name: 'ElevatorService',
            path: '../services/elevatorService',
        },
        floor: {
            name: 'FloorService',
            path: '../services/floorService',
        },
        floorMap: {
            name: 'FloorMapService',
            path: '../services/floorMapService',
        },
        passage: {
            name: 'PassageService',
            path: '../services/passageService',
        },
        taskType: {
            name: 'TaskTypeService',
            path: '../services/taskTypeService',
        },
        robotType: {
            name: 'RobotTypeService',
            path: '../services/robotTypeService',
        },
        room: {
            name: 'RoomService',
            path: '../services/roomService',
        },
        robot: {
            name: 'RobotService',
            path: '../services/robotService',
        },
        user: {
            name: 'UserService',
            path: '../services/userService',
        },
        auth: {
            name: 'AuthService',
            path: '../services/authService',
        },
        planning: {
            name: 'PlanningService',
            path: '../services/planningService',
        },
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
        floorMap: {
            name: 'floorMapSchema',
            schema: '../persistence/schemas/floorMapSchema',
        },
        building: {
            name: 'buildingSchema',
            schema: '../persistence/schemas/buildingSchema',
        },
        task: {
            name: 'taskSchema',
            schema: '../persistence/schemas/taskSchema',
        },

        taskType: {
            name: 'taskTypeSchema',
            schema: '../persistence/schemas/taskTypeSchema',
        },
        robotType: {
            name: 'robotTypeSchema',
            schema: '../persistence/schemas/robotTypeSchema',
        },
    },
};
