import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:ca7408396943512431f6af8a@vsgate-s1.dei.isep.ipp.pt:10937/?authMechanism=SCRAM-SHA-1",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

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
      name: "RoleRepo",
      path: "../repos/roleRepo"
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
      name: "userShcema",
      schema: "../persistence/schemas/userSchema"
    },

    role: {
      name: "roleSchema",
      schema: "../persistence/schemas/roleSchema"
    },

    task: {
      name: "taskSchema",
      patschemah: "../persistence/schemas/taskSchema"
    },

    robot: {
      name: "robotSchema",
      schema: "../persistence/schemas/robotSchema"
    },

    drone: {
      name: "droneSchema",
      schema: "../persistence/schemas/droneSchema"
    },

    room: {
      name: "roomSchema",
      schema: "../persistence/schemas/roomSchema"
    },

    passage: {
      name: "passageSchema",
      schema: "../persistence/schemas/passageSchema"
    },

    elevator: {
      name: "elevatorSchema",
      schema: "../persistence/schemas/elevatorSchema"
    },

    floor: {
      name: "floorSchema",
      schema: "../persistence/schemas/floorSchema"
    },

    building: {
      name: "buildingSchema",
      schema: "../persistence/schemas/buildingSchema"
    },
  },

};
