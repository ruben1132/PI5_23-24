import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

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

    const floorMapSchema = {
        name: 'floorMapSchema',
        schema: '../persistence/schemas/floorMapSchema',
    };

    const buildingSchema = {
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };

    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }

    const buildingController = {
        name: config.controllers.building.name,
        path: config.controllers.building.path
    }

    const floorController = {
        name: config.controllers.floor.name,
        path: config.controllers.floor.path
    }

    const passageController = {
        name: config.controllers.passage.name,
        path: config.controllers.passage.path
    }

    const roleRepo = {
        name: config.repos.role.name,
        path: config.repos.role.path
    }

    const userRepo = {
        name: config.repos.user.name,
        path: config.repos.user.path
    }

    const buildingRepo = {
        name: config.repos.building.name,
        path: config.repos.building.path
    }

    const floorRepo = {
        name: config.repos.floor.name,
        path: config.repos.floor.path
    }

    const passageRepo = {
        name: config.repos.passage.name,
        path: config.repos.passage.path
    }

    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }

    const buildingService = {
        name: config.services.building.name,
        path: config.services.building.path
    }

    const floorService = {
        name: config.services.floor.name,
        path: config.services.floor.path
    }

    const passageService = {
        name: config.services.passage.name,
        path: config.services.passage.path
    }

    await dependencyInjectorLoader({
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
            floorMapSchema,
            buildingSchema
        ],
        controllers: [
            roleController,
            buildingController,
            floorController,
            passageController
        ],
        repos: [
            roleRepo,
            userRepo,
            buildingRepo,
            floorRepo,
            passageRepo
        ],
        services: [
            roleService,
            buildingService,
            floorService,
            passageService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
