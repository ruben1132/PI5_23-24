"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const taskId_1 = require("./valueObj/taskId");
class Task extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get taskId() {
        return new taskId_1.TaskId(this.taskId.toValue());
    }
    get designation() {
        return this.props.designation;
    }
    get assigned() {
        return this.props.assigned;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map