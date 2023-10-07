"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const elevatorId_1 = require("./valueObj/elevatorId");
class Elevator extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get elevatorId() {
        return new elevatorId_1.ElevatorId(this.elevatorId.toValue());
    }
    get building() {
        return this.props.building;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map