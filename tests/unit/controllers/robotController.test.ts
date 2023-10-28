import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import RobotController from '../../../src/controllers/robotController';
import IRobotDTO from '../../../src/dto/IRobotDTO';
import RobotService from '../../../src/services/robotService';
import RobotRepo from '../../../src/repos/robotRepo';
import RobotTypeRepo from '../../../src/repos/robotTypeRepo';
import RobotSchema from '../../../src/persistence/schemas/robotSchema';
import { SinonSpy } from 'sinon';

describe('Robot Controller', function () {

    let robotRepo: RobotRepo;
    let robotTypeRepo: RobotTypeRepo;
    let service: RobotService;

    beforeEach(function () {
        robotRepo = new RobotRepo(RobotSchema);
        service = new RobotService(robotRepo, robotTypeRepo);
    });

    afterEach(function () {
        sinon.restore();
    });
    it('robotController unit test using robotService stub', async function () {

        // Arrange
        let body = {
            "identification": "123456",
            "nickname": "nicknameTeste2",
            "robotType": "64b91131-d722-4038-a43f-6fddc4b72df5",
            "serialNumber": "123456789",
            "description": "descriptionTeste",
            "state": true
        }
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(service, "createRobot").resolves(Result.ok<IRobotDTO>({
            "domainId": "123",
            "identification": req.body.identification,
            "nickname": req.body.nickname,
            "robotType": req.body.robotType,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "state": req.body.state
        }
        ));

        const ctrl = new RobotController(service);

        // Act
        await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
                "domainId": "123",
                "identification": req.body.identification,
                "nickname": req.body.nickname,
                "robotType": req.body.robotType,
                "serialNumber": req.body.serialNumber,
                "description": req.body.description,
                "state": req.body.state
            }));

        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();



    });
});

