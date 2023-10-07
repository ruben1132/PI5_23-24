"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskType = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const taskTypeId_1 = require("./valueObj/taskTypeId");
class TaskType extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get taskTypeId() {
        return new taskTypeId_1.TaskTypeId(this.taskTypeId.toValue());
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.TaskType = TaskType;
//# sourceMappingURL=taskType.js.map