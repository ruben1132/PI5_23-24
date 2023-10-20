import { Building } from "../../../src/domain/building";
import { BuildingCode } from "../../../src/domain/valueObj/buildingCode";
import { BuildingName } from "../../../src/domain/valueObj/buildingName";
import { BuildingDimensions } from "../../../src/domain/valueObj/buildingDimensions";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { expect } from 'chai';

describe("Building", () => {
    it("should create a building with valid properties", () => {
        const buildingCode = BuildingCode.create("B001").getValue();
        const buildingName = BuildingName.create("Building 1").getValue();
        const buildingDimensions = BuildingDimensions.create("10x8").getValue();
        const buildingId = new UniqueEntityID();

        const buildingOrError = Building.create(
            {
                code: buildingCode,
                name: buildingName,
                dimensions: buildingDimensions,
            },
            buildingId
        );

        expect(buildingOrError.isSuccess).to.be.true;

        const building = buildingOrError.getValue();

        expect(buildingCode).to.equal(building.code);
        expect(buildingName).to.equal(building.name);
        expect(buildingDimensions).to.equal(building.dimensions);
        expect(buildingId).to.equal(building.id);
    });

    it("should fail, building code invalid", () => {
        const buildingCode = BuildingCode.create("").errorValue();
        expect(buildingCode).to.equal("Building code is invalid");
    });

    it("should fail, building name invalid", () => {
        const buildingName = BuildingName.create("").errorValue();
        expect(buildingName).to.equal("Building name is invalid");
    });

    it("should fail, building dimensions invalid", () => {
        const buildingDimensions = BuildingDimensions.create("").errorValue();
        expect(buildingDimensions).to.equal("Building dimensions is invalid");
    });
});
