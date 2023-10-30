import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import RoomController from '../../../src/controllers/roomController';
import IRoomDTO from '../../../src/dto/IRoomDTO';
import RoomService from '../../../src/services/roomService';
import RoomRepo from '../../../src/repos/roomRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import RoomSchema from '../../../src/persistence/schemas/roomSchema';
import { SinonSpy } from 'sinon';

describe('Room Controller', function () {

    let roomRepo: RoomRepo;
    let floorRepo: FloorRepo;
    let service: RoomService;

    beforeEach(function () {
        roomRepo = new RoomRepo(RoomSchema);
        service = new RoomService(roomRepo, floorRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('roomController unit test using roomService stub', async function () {

        // Arrange
        let body = {
            "number": "T002",
            "floor": "f3483019-0f1b-4283-aab1-e5338ec3a7b3"
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createRoom").resolves(Result.ok<IRoomDTO>({
            "domainId": "123",
            "number": req.body.number,
            "floor": req.body.floor
        }
        ));

        const ctrl = new RoomController(service);

        // Act
        await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "domainId": "123",
                "number": req.body.number,
                "floor": req.body.floor
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

