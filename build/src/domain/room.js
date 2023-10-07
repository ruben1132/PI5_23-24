"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const roomId_1 = require("./valueObj/roomId");
class Room extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get roomId() {
        return new roomId_1.RoomId(this.roomId.toValue());
    }
    get number() {
        return this.props.number;
    }
    set number(value) {
        this.props.number = value;
    }
    get floor() {
        return this.props.floor;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map