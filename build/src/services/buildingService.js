"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const building_1 = require("../domain/building");
const Result_1 = require("../core/logic/Result");
const BuildingMap_1 = require("../mappers/BuildingMap");
let BuildingService = class BuildingService {
    constructor(buildingRepo) {
        this.buildingRepo = buildingRepo;
    }
    async getBuildings() {
        try {
            const roles = await this.buildingRepo.getBuildings();
            if (roles === null) {
                return Result_1.Result.fail("Buildings not found");
            }
            else {
                const buildingsDTOResult = roles.map(building => BuildingMap_1.BuildingMap.toDTO(building));
                return Result_1.Result.ok(buildingsDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createBuilding(buildingDTO) {
        try {
            const buildingOrError = await building_1.Building.create(buildingDTO);
            if (buildingOrError.isFailure) {
                return Result_1.Result.fail(buildingOrError.errorValue());
            }
            const buildingResult = buildingOrError.getValue();
            const test = await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(buildingResult);
            return Result_1.Result.ok(buildingDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateBuilding(buildingDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
            if (building === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                building.designation = buildingDTO.designation;
                await this.buildingRepo.save(building);
                const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
                return Result_1.Result.ok(buildingDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getBuildingsByFloorRange(idMin, idMax) {
        try {
            const buildings = await this.buildingRepo.getBuildingsByFloorRange(idMin, idMax);
            // const floors = await this.floorRe
            const buildingDTOs = buildings.map(building => BuildingMap_1.BuildingMap.toDTO(building));
            return Result_1.Result.ok(buildingDTOs);
        }
        catch (err) {
            throw err;
        }
    }
};
BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object])
], BuildingService);
exports.default = BuildingService;
//# sourceMappingURL=buildingService.js.map