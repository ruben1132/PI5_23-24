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

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
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
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
