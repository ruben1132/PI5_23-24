"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const floorId_1 = require("./valueObj/floorId");
class Floor extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorId() {
        return new floorId_1.FloorId(this.floorId.toValue());
    }
    get number() {
        return this.props.number;
    }
    set number(value) {
        this.props.number = value;
    }
    get building() {
        return this.props.building;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map