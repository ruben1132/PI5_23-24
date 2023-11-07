import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import ElevatorController from '../../../src/controllers/elevatorController';
import IElevatorDTO from '../../../src/dto/IElevatorDTO';
import ElevatorService from '../../../src/services/elevatorService';
import ElevatorRepo from '../../../src/repos/elevatorRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import ElevatorSchema from '../../../src/persistence/schemas/elevatorSchema';
import { SinonSpy } from 'sinon';

describe('Elevator Controller', function () {

    let elevatorRepo: ElevatorRepo;
    let floorRepo: FloorRepo;
    let service: ElevatorService;

    beforeEach(function () {
        elevatorRepo = new ElevatorRepo(ElevatorSchema);
        service = new ElevatorService(elevatorRepo, floorRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('elevatorController unit test using elevatorService stub', async function () {

        // Arrange
        let body = {
            "designation": "Building Z elevator",
            "floorsAllowed": [
                "f3483019-0f1b-4283-aab1-e5338ec3a7b3",
                "93984d2c-508d-4bf1-9114-41be04b7eab6"
            ]
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createElevator").resolves(Result.ok<IElevatorDTO>({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        }
        ));

        const ctrl = new ElevatorController(service);

        // Act
        await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "id": "123",
                "designation": req.body.designation,
                "floorsAllowed": req.body.floorsAllowed
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

