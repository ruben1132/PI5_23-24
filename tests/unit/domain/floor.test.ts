import { Floor } from "../../../src/domain/floor";
import { FloorInformation } from "../../../src/domain/valueObj/floorInformation";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { expect } from 'chai';

describe('Floor', () => {
  const buildingId = new UniqueEntityID("test-id");

  const floorNumber =  1;
  const floorInformation =  FloorInformation.create('Information about the floor').getValue();

  it('should create a new floor', () => {
    const floorOrError = Floor.create({
      number: floorNumber,
      information: floorInformation,
      building: buildingId
    });

    expect(floorOrError.isSuccess).to.be.true;

    const floor = floorOrError.getValue();

    expect(floor.number).to.equal(floorNumber);
    expect(floor.information).to.equal(floorInformation);
    expect(floor.building).to.equal(buildingId);
  });

  it('should fail to create a new floor if number is not provided', () => {
    const floorOrError = Floor.create({
      number: null,
      information: floorInformation,
      building: buildingId
    });

    expect(floorOrError.isFailure).to.be.true;
    expect('number is null or undefined').to.equal(floorOrError.errorValue());
  });

  it('should fail to create a new floor if information is not provided', () => {
    const floorOrError = Floor.create({
      number: floorNumber,
      information: null,
      building: buildingId
    });

    expect(floorOrError.isFailure).to.be.true;
    expect('information is null or undefined').to.equal(floorOrError.errorValue());
  });

  it('should fail to create a new floor if building is not provided', () => {
    const floorOrError = Floor.create({
      number: floorNumber,
      information: floorInformation,
      building: null
    });

    expect(floorOrError.isFailure).to.be.true;
    expect('building is null or undefined').to.equal(floorOrError.errorValue());
  });

});