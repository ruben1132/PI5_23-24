import { Floor } from "../../../src/domain/floor";
import { Building } from "../../../src/domain/building";
import { FloorNumber } from "../../../src/domain/valueObj/floorNumber";
import { FloorInformation } from "../../../src/domain/valueObj/floorInformation";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { BuildingCode } from "../../../src/domain/valueObj/buildingCode";
import { BuildingName } from "../../../src/domain/valueObj/buildingName";
import { BuildingDimensions } from "../../../src/domain/valueObj/buildingDimensions";
import { expect } from 'chai';

describe('Floor', () => {
  const building = Building.create({
    code: BuildingCode.create("B001").getValue(),
    name: BuildingName.create("Building 1").getValue(),
    dimensions: BuildingDimensions.create("10x8").getValue(),
}, new UniqueEntityID("test-id")).getValue();

  const floorNumber =  FloorNumber.create(1).getValue();
  const floorInformation =  FloorInformation.create('Information about the floor').getValue();

  it('should create a new floor', () => {
    const floorOrError = Floor.create({
      number: floorNumber,
      information: floorInformation,
      building: building
    });

    expect(floorOrError.isSuccess).to.be.true;

    const floor = floorOrError.getValue();

    expect(floor.number).to.equal(floorNumber);
    expect(floor.information).to.equal(floorInformation);
    expect(floor.building).to.equal(building);
  });

  it('should fail to create a new floor if number is not provided', () => {
    const floorOrError = Floor.create({
      number: null,
      information: floorInformation,
      building: building
    });

    expect(floorOrError.isFailure).to.be.true;
    expect('number is null or undefined').to.equal(floorOrError.errorValue());
  });

  it('should fail to create a new floor if information is not provided', () => {
    const floorOrError = Floor.create({
      number: floorNumber,
      information: null,
      building: building
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