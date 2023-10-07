"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const buildingId_1 = require("./valueObj/buildingId");
class Building extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get buildingId() {
        return new buildingId_1.BuildingId(this.buildingId.toValue());
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map