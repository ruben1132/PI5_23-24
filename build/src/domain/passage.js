"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passage = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const passageId_1 = require("./valueObj/passageId");
class Passage extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get passageId() {
        return new passageId_1.PassageId(this.passageId.toValue());
    }
    get designation() {
        return this.props.designation;
    }
    set designation(value) {
        this.props.designation = value;
    }
    get fromBuilding() {
        return this.props.fromBuilding;
    }
    get toBuilding() {
        return this.props.toBuilding;
    }
    constructor(props, id) {
        super(props, id);
    }
}
exports.Passage = Passage;
//# sourceMappingURL=passage.js.map