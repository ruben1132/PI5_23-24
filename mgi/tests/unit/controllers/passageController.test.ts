import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import PassageController from '../../../src/controllers/passageController';
import IPassageDTO from '../../../src/dto/IPassageDTO';
import PassageService from '../../../src/services/passageService';
import PassageRepo from '../../../src/repos/passageRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import PassageSchema from '../../../src/persistence/schemas/passageSchema';
import { SinonSpy } from 'sinon';

describe('Passage Controller', function () {

    let passageRepo: PassageRepo;
    let floorRepo: FloorRepo;
    let service: PassageService;

    beforeEach(function () {
        passageRepo = new PassageRepo(PassageSchema);
        service = new PassageService(passageRepo, floorRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('passageController unit test using passageService stub', async function () {

        // Arrange
        let body = {
            "designation": "test",
            "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6",
            "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab"
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createPassage").resolves(Result.ok<IPassageDTO>({
            "id": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        }
        ));

        const ctrl = new PassageController(service);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "id": "123",
                "designation": req.body.designation,
                "fromFloor": req.body.fromFloor,
                "toFloor": req.body.toFloor
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

