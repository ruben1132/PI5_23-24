import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import BuildingController from '../../../src/controllers/buildingController';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import BuildingService from '../../../src/services/buildingService';
import BuildingRepo from '../../../src/repos/buildingRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import BuildingSchema from '../../../src/persistence/schemas/buildingSchema';
import { SinonSpy } from 'sinon';

describe('Building Controller', function () {

    let buildingRepo: BuildingRepo;
    let floorRepo: FloorRepo;
    let service : BuildingService;

    beforeEach(function() {
        buildingRepo = new BuildingRepo(BuildingSchema);
        service = new BuildingService(buildingRepo, floorRepo);
    });

    afterEach(function() {
        sinon.restore();
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

        sinon.stub(service, "createBuilding").resolves(Result.ok<IBuildingDTO>({
            "id": "123",
            "code": req.body.code,
            "dimensions": req.body.dimensions, "name": req.body.name
        }
        ));

        const ctrl = new BuildingController(service);

        // Act
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "id": "123",
                "code": req.body.code,
                "dimensions": req.body.dimensions,
                "name": req.body.name
            }));

        } catch (error) {
            console.log(error);
            
            throw error;
        }

        sinon.restore();

        

    });
});

