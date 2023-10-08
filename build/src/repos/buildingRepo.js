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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const buildingId_1 = require("../domain/valueObj/buildingId");
const BuildingMap_1 = require("../mappers/BuildingMap");
const mongoose_1 = require("mongoose");
let BuildingRepo = class BuildingRepo {
    constructor(buildingSchema) {
        this.buildingSchema = buildingSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(building) {
        const idX = building.id instanceof buildingId_1.BuildingId ? building.id.toValue() : building.id;
        const query = { domainId: idX };
        const buildingDocument = await this.buildingSchema.findOne(query);
        return !!buildingDocument === true;
    }
    async save(building) {
        const query = { domainId: building.id.toString() };
        const buildingDocument = await this.buildingSchema.findOne(query);
        try {
            if (buildingDocument === null) {
                const rawBuilding = BuildingMap_1.BuildingMap.toPersistence(building);
                const buildingCreated = await this.buildingSchema.create(rawBuilding);
                return BuildingMap_1.BuildingMap.toDomain(buildingCreated);
            }
            else {
                buildingDocument.designation = building.designation;
                await buildingDocument.save();
                return building;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(buildingId) {
        const query = { domainId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(query);
        if (buildingRecord != null) {
            return BuildingMap_1.BuildingMap.toDomain(buildingRecord);
        }
        else
            return null;
    }
};
BuildingRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('buildingSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BuildingRepo);
exports.default = BuildingRepo;
//# sourceMappingURL=buildingRepo.js.map