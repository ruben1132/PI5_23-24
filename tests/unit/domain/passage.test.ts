import { Passage } from "../../../src/domain/passage";
import { Floor } from "../../../src/domain/floor";
import { FloorInformation } from "../../../src/domain/valueObj/floorInformation";
import { Building } from "../../../src/domain/building";
import { BuildingCode } from "../../../src/domain/valueObj/buildingCode";
import { BuildingName } from "../../../src/domain/valueObj/buildingName";
import { BuildingDimensions } from "../../../src/domain/valueObj/buildingDimensions";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { expect } from 'chai';
import { FloorId } from "../../../src/domain/valueObj/floorId";

describe('Passage', () => {

    const fromFloor = new FloorId('1');
    const toFloor = new FloorId('2');
    const designation = 'Passage 1';

    describe('create', () => {

        it('should fail if no fromFloor is provided', () => {
            const passage = Passage.create({ designation: 'Passage 1', toFloor: toFloor, fromFloor: null });

            expect(passage.isFailure).to.be.true;
            expect('fromFloor is null or undefined').to.be.equal(passage.errorValue());
        });

        it('should fail if no toFloor is provided', () => {
            const passage = Passage.create({ designation: 'Passage 1', fromFloor: fromFloor, toFloor: null });

            expect(passage.isFailure).to.be.true;
            expect('toFloor is null or undefined').to.be.equal(passage.errorValue());
        });

        it('should fail if fromFloor and toFloor are in the same building', () => {
            const passage = Passage.create({ designation: 'Passage 1', fromFloor, toFloor: fromFloor });

            expect(passage.isFailure).to.be.true;
            expect('The passage must be between different floors and buildings').to.be.equal(passage.errorValue());
        });

        it('should fail if no designation', () => {
            const passage = Passage.create({ designation: null, fromFloor, toFloor });

            expect(passage.isFailure).to.be.true;
            expect('designation is null or undefined').to.be.equal(passage.errorValue());
        });

        it('should create a passage with valid data', () => {
            const passage = Passage.create({ designation, fromFloor, toFloor });

            expect(passage.isSuccess).to.be.true;
            expect(passage.getValue()).to.be.instanceOf(Passage);
            expect('Passage 1').to.be.equal(passage.getValue().designation);
            expect(fromFloor).to.be.equal(passage.getValue().fromFloor);
            expect(toFloor).to.be.equal(passage.getValue().toFloor);
        });
    });
});