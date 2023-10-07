"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const autonomousId_1 = require("./valueObj/autonomousId");
class Robot extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get autonomousId() {
        return new autonomousId_1.AutonomousId(this.autonomousId.toValue());
    }
    get designation() {
        return this.designation;
    }
    set designation(value) {
        this.designation = value;
    }
    get state() {
        return this.state;
    }
    set state(value) {
        this.state = value;
    }
    get taskTypesAllowed() {
        return this.taskTypesAllowed;
    }
    set taskTypesAllowed(value) {
        this.taskTypesAllowed = value;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map