import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IBuildingService from "../../src/services/IServices/IBuildingService";
import BuildingController from "../../src/controllers/buildingController";
import BuildingService from "../../src/services/buildingService";
import BuildingRepo from "../../src/repos/buildingRepo";
import { Building } from '../../src/domain/building';
import IBuildingDTO from '../../src/dto/IBuildingDTO';
import { SinonSpy } from 'sinon';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import BuildingSchema from '../../src/persistence/schemas/buildingSchema';
import FloorRepo from '../../src/repos/floorRepo';

describe('Building X Controller', function () {
    const sandbox = sinon.createSandbox();

    let buildingSchema: typeof BuildingSchema;
    let buildingRepo: BuildingRepo;
    let floorRepo: FloorRepo;
    let buildingService: BuildingService;

    beforeEach(function () {
        Container.reset();
        buildingSchema = BuildingSchema;

        buildingRepo = new BuildingRepo(buildingSchema);
        buildingService = new BuildingService(buildingRepo, floorRepo);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('buildingController unit test using buildingService stub', async function () {
        // Arrange
        let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(buildingService, "createBuilding").returns(Promise.resolve(Result.ok<IBuildingDTO>({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        })));

        const ctrl = new BuildingController(buildingService as IBuildingService);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        }));
    });


    it('buildingController unit test using buildingService stub', async function () {
        // Arrange
        let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(buildingService, "createBuilding").returns(Promise.resolve(Result.ok<IBuildingDTO>({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        })));

        const ctrl = new BuildingController(buildingService as IBuildingService);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        }));
    });

    it('buildingController + buildingService integration test using buildingRepoistory and Building stubs', async function () {
        // Arrange	
        let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        const b = Building.create({ "code": req.body.code, "dimensions": req.body.dimensions, "name": req.body.name }, new UniqueEntityID("123"));

        sinon.stub(buildingRepo, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(b.getValue())
        }));


        const ctrl = new BuildingController(buildingService as IBuildingService);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }));
    });


    it('buildingController + buildingService integration test using spy on buildingService', async function () {
        // Arrange
        let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(buildingRepo, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(Building.create({ "code": req.body.code, "dimensions": req.body.dimensions, "name": req.body.name }, new UniqueEntityID("123")).getValue())
        }));


        const buildingServiceSpy = sinon.spy(buildingService, "createBuilding");

        const ctrl = new BuildingController(buildingService as IBuildingService);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }));
        sinon.assert.calledOnce(buildingServiceSpy);
        //sinon.assert.calledTwice(buildingServiceSpy);
        sinon.assert.calledWith(buildingServiceSpy, sinon.match({ "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }));
    });

    it('buildingController unit test using buildingService mock', async function () {
        // Arrange
        let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        const buildingServiceMock = sinon.mock(buildingService)
        buildingServiceMock.expects("createBuilding")
            .once()
            .withArgs(sinon.match({ name: req.body.name }))
            .returns(Result.ok<IBuildingDTO>({
                "id": "123",
                "code": req.body.code,
                "dimensions": req.body.dimensions, "name": req.body.name
            }));

        const ctrl = new BuildingController(buildingService as IBuildingService);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        buildingServiceMock.verify();
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        }));
    });
});

