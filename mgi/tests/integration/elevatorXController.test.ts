import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IElevatorService from "../../src/services/IServices/IElevatorService";
import ElevatorController from "../../src/controllers/elevatorController";
import ElevatorService from "../../src/services/elevatorService";
import ElevatorRepo from "../../src/repos/elevatorRepo";
import { Elevator } from '../../src/domain/elevator';
import IElevatorDTO from '../../src/dto/IElevatorDTO';
import { SinonSpy } from 'sinon';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import ElevatorSchema from '../../src/persistence/schemas/elevatorSchema';
import FloorRepo from '../../src/repos/floorRepo';

describe('Elevator X Controller', function () {
    const sandbox = sinon.createSandbox();

    let elevatorSchema: typeof ElevatorSchema;
    let elevatorRepo: ElevatorRepo;
    let floorRepo: FloorRepo;
    let elevatorService: ElevatorService;

    beforeEach(function () {
        Container.reset();
        elevatorSchema = ElevatorSchema;

        elevatorRepo = new ElevatorRepo(elevatorSchema);
        elevatorService = new ElevatorService(elevatorRepo, floorRepo);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('elevatorController unit test using elevatorService stub', async function () {
        // Arrange
        let body = {
            "designation": "Elevator Z elevator",
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

        sinon.stub(elevatorService, "createElevator").returns(Promise.resolve(Result.ok<IElevatorDTO>({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        })));

        const ctrl = new ElevatorController(elevatorService as IElevatorService);

        // Act
        await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        }));
    });


    it('elevatorController unit test using elevatorService stub', async function () {
        // Arrange
        let body = {
            "designation": "Elevator Z elevator",
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

        sinon.stub(elevatorService, "createElevator").returns(Promise.resolve(Result.ok<IElevatorDTO>({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        })));

        const ctrl = new ElevatorController(elevatorService as IElevatorService);

        // Act
        await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        }));
    });

    // it('elevatorController + elevatorService integration test using elevatorRepoistory and Elevator stubs', async function () {
    //     // Arrange
    //     let body = {
    //         "designation": "Elevator Z elevator",
    //         "floorsAllowed": [
    //             "f3483019-0f1b-4283-aab1-e5338ec3a7b3",
    //             "93984d2c-508d-4bf1-9114-41be04b7eab6"
    //         ]
    //     };
    //     let req: Partial<Request> = {};
    //     req.body = body;

    //     let res: Partial<Response> = {
    //         json: sinon.spy() as SinonSpy<[any?]>
    //     };
    //     let next: Partial<NextFunction> = () => { };

    //     const b = Elevator.create({ "designation": req.body.designation, "floorsAllowed": req.body.floorsAllowed }, new UniqueEntityID("123"));

    //     // sinon.stub(Elevator, "create").returns(Result.ok(b.getValue()));

    //     sinon.stub(elevatorRepo, "save").returns(new Promise<Elevator>((resolve, reject) => {
    //         resolve(b.getValue())
    //     }));


    //     const ctrl = new ElevatorController(elevatorService as IElevatorService);

    //     // Act
    //     await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    //     // Assert
    //     sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
    //     sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({"desgination": req.body.designation, "floorsAllowed": req.body.floorsAllowed }));
    // });


    // it('elevatorController + elevatorService integration test using spy on elevatorService', async function () {
    //     // Arrange
    //     let body = { "name": 'elevator12' };
    //     let req: Partial<Request> = {};
    //     req.body = body;

    //     let res: Partial<Response> = {
    //         json: sinon.spy() as SinonSpy<[any?]>
    //     };
    //     let next: Partial<NextFunction> = () => { };

    //     sinon.stub(elevatorRepo, "save").returns(new Promise<Elevator>((resolve, reject) => {
    //         resolve(Elevator.create({ "designation": req.body.designation, "floorsAllowed": req.body.floorsAllowed }, new UniqueEntityID("123")).getValue())
    //     }));

    //     const elevatorServiceSpy = sinon.spy(elevatorService, "createElevator");

    //     const ctrl = new ElevatorController(elevatorService as IElevatorService);

    //     // Act
    //     await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    //     // Assert
    //     sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
    //     sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({"desgination": req.body.designation, "floorsAllowed": req.body.floorsAllowed }));
    //     sinon.assert.calledOnce(elevatorServiceSpy);
    //     //sinon.assert.calledTwice(elevatorServiceSpy);
    //     sinon.assert.calledWith(elevatorServiceSpy, sinon.match({"desgination": req.body.designation, "floorsAllowed": req.body.floorsAllowed }));
    // });

    it('elevatorController unit test using elevatorService mock', async function () {
        // Arrange
        let body = {
            "designation": "Elevator Z elevator",
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

        const elevatorServiceMock = sinon.mock(elevatorService)
        elevatorServiceMock.expects("createElevator")
            .once()
            .withArgs(sinon.match({ name: req.body.name }))
            .returns(Result.ok<IElevatorDTO>({
                "id": "123",
                "designation": req.body.designation,
                "floorsAllowed": req.body.floorsAllowed
            }));

        const ctrl = new ElevatorController(elevatorService as IElevatorService);

        // Act
        await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        elevatorServiceMock.verify();
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "id": "123",
            "designation": req.body.designation,
            "floorsAllowed": req.body.floorsAllowed
        }));
    });
});

