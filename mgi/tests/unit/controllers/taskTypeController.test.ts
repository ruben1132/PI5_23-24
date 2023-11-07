import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import TaskTypeController from '../../../src/controllers/taskTypeController';
import ITaskTypeDTO from '../../../src/dto/ITaskTypeDTO';
import TaskTypeService from '../../../src/services/taskTypeService';
import TaskTypeRepo from '../../../src/repos/taskTypeRepo';
import TaskTypeSchema from '../../../src/persistence/schemas/taskTypeSchema';
import { SinonSpy } from 'sinon';

describe('TaskType Controller', function () {

    let taskTypeRepo: TaskTypeRepo;
    let service : TaskTypeService;

    beforeEach(function() {
        taskTypeRepo = new TaskTypeRepo(TaskTypeSchema);
        service = new TaskTypeService(taskTypeRepo);
    });

    afterEach(function() {
        sinon.restore();
    });
    it('taskTypeController unit test using taskTypeService stub', async function () {

        // Arrange
        let body = {
            "name": "Task3",
            "description": "Task 3 description"
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createTaskType").resolves(Result.ok<ITaskTypeDTO>({
            "id": "123",
            "name": req.body.name,
            "description": req.body.description
        }
        ));

        const ctrl = new TaskTypeController(service);

        // Act
        await ctrl.createTaskType(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "id": "123",
                "name": req.body.name,
                "description": req.body.description
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

