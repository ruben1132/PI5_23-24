"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const buildingId_1 = require("./valueObj/buildingId");
class Building extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get buildingId() {
        return new buildingId_1.BuildingId(this.buildingId.toValue());
    }
    get designation() {
        return this.props.designation;
    }
    constructor(props, id) {
        super(props, id);
    }
    // TODO: implementar regras de negocio na criacao de uma building
    static create(buildingDTO, id) {
        const designation = buildingDTO.designation;
        if (!!designation === false || designation.length === 0) {
            return Result_1.Result.fail('Must provide a building name');
        }
        else {
            const building = new Building({ designation: designation }, id);
            return Result_1.Result.ok(building);
        }
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map