"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const building_1 = require("../domain/building");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class BuildingMap extends Mapper_1.Mapper {
    static toDTO(building) {
        return {
            id: building.id.toString(),
            designation: building.designation,
        };
    }
    static toDomain(building) {
        const buildingOrError = building_1.Building.create(building, new UniqueEntityID_1.UniqueEntityID(building.domainId));
        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }
    static toPersistence(building) {
        return {
            domainId: building.id.toString(),
            designation: building.designation
        };
    }
}
exports.BuildingMap = BuildingMap;
//# sourceMappingURL=BuildingMap.js.map