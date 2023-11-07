import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import RobotTypeController from '../../../src/controllers/robotTypeController';
import IRobotTypeDTO from '../../../src/dto/IRobotTypeDTO';
import RobotTypeService from '../../../src/services/robotTypeService';
import RobotTypeRepo from '../../../src/repos/robotTypeRepo';
import TaskTypeRepo from '../../../src/repos/taskTypeRepo';
import RobotTypeSchema from '../../../src/persistence/schemas/robotTypeSchema';
import { SinonSpy } from 'sinon';

describe('RobotType Controller', function () {

    let robotTypeRepo: RobotTypeRepo;
    let taskTypeRepo: TaskTypeRepo;
    let service: RobotTypeService;

    beforeEach(function () {
        robotTypeRepo = new RobotTypeRepo(RobotTypeSchema);
        service = new RobotTypeService(robotTypeRepo, taskTypeRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('robotTypeController unit test using robotTypeService stub', async function () {

        // Arrange
        let body = {
            "type": "Tipo3",
            "brand": "Marca de Robot 3",
            "model": "Modelo de Robot 3",
            "tasksAllowed": [
                "b9e746e4-e942-4af4-aaf8-5262c8608c4e",
                "72eb1ce7-08aa-4f18-891e-1da84ee426b7"
            ]
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createRobotType").resolves(Result.ok<IRobotTypeDTO>({
            "id": "123",
            "type": req.body.type,
            "brand": req.body.brand,
            "model": req.body.model,
            "tasksAllowed": req.body.tasksAllowed
        }
        ));

        const ctrl = new RobotTypeController(service);

        // Act
        await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "id": "123",
                "type": req.body.type,
                "brand": req.body.brand,
                "model": req.body.model,
                "tasksAllowed": req.body.tasksAllowed
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

