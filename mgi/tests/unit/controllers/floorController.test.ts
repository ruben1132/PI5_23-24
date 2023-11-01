import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import FloorController from '../../../src/controllers/floorController';
import IFloorDTO from '../../../src/dto/IFloorDTO';
import FloorService from '../../../src/services/floorService';
import FloorRepo from '../../../src/repos/floorRepo';
import BuildingRepo from '../../../src/repos/buildingRepo';
import FloorSchema from '../../../src/persistence/schemas/floorSchema';
import { SinonSpy } from 'sinon';

describe('Floor Controller', function () {

    let floorRepo: FloorRepo;
    let buildingRepo: BuildingRepo;
    let service: FloorService;

    beforeEach(function () {
        floorRepo = new FloorRepo(FloorSchema);
        service = new FloorService(floorRepo, buildingRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('floorController unit test using floorService stub', async function () {

        // Arrange
        let body = {
            "building": "774c64e4-c4e7-4bf4-9a41-6f7d67b9e4b0",
            "number": 404,
            "information": "Building R Floor 404"
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createFloor").resolves(Result.ok<IFloorDTO>({
            "domainId": "123",
            "number": req.body.number,
            "information": req.body.information,
            "building": req.body.building
        }
        ));

        const ctrl = new FloorController(service);

        // Act
        await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "domainId": "123",
                "number": req.body.number,
                "information": req.body.information,
                "building": req.body.building
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();
    

    });
});

