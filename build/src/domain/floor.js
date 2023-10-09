"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
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
    get information() {
        return this.props.information;
    }
    set information(value) {
        this.props.information = value;
    }
    get building() {
        return this.props.building;
    }
    set building(value) {
        this.props.building = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    // TODO: implementar regras de negocio na criacao de uma floor
    static create(floorDTO, id) {
        const number = floorDTO.number;
        const information = floorDTO.information;
        const building = floorDTO.building;
        if (!!number === false || number === 0) {
            return Result_1.Result.fail('Must provide a floor number');
        }
        else if (!!information === false || information === '') {
            return Result_1.Result.fail('Must provide a floor information');
        }
        else if (!!building === false || building === null) {
            return Result_1.Result.fail('Must provide a building');
        }
        else {
            const floor = new Floor({ number: number, information: information, building: building }, id);
            return Result_1.Result.ok(floor);
        }
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map