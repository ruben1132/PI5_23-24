import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IPassageService from "../../src/services/IServices/IPassageService";
import PassageController from "../../src/controllers/passageController";
import PassageService from "../../src/services/passageService";
import PassageRepo from "../../src/repos/passageRepo";
import { Passage } from '../../src/domain/passage';
import IPassageDTO from '../../src/dto/IPassageDTO';
import { SinonSpy } from 'sinon';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import PassageSchema from '../../src/persistence/schemas/passageSchema';
import FloorRepo from '../../src/repos/floorRepo';

describe('Passage X Controller', function () {
    const sandbox = sinon.createSandbox();

    let passageSchema: typeof PassageSchema;
    let passageRepo: PassageRepo;
    let floorRepo: FloorRepo;
    let passageService: PassageService;

    beforeEach(function () {
        Container.reset();
        passageSchema = PassageSchema;

        passageRepo = new PassageRepo(passageSchema);
        passageService = new PassageService(passageRepo, floorRepo);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('passageController unit test using passageService stub', async function () {
        // Arrange
        let body = { "designation": "test", "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6", "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab" };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(passageService, "createPassage").returns(Promise.resolve(Result.ok<IPassageDTO>({
            "domainId": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        })));

        const ctrl = new PassageController(passageService as IPassageService);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "domainId": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        }));
    });


    it('passageController unit test using passageService stub', async function () {
        // Arrange
        let body = { "designation": "test", "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6", "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab" };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(passageService, "createPassage").returns(Promise.resolve(Result.ok<IPassageDTO>({
            "domainId": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        })));

        const ctrl = new PassageController(passageService as IPassageService);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "domainId": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        }));
    });

    it('passageController + passageService integration test using passageRepoistory and Passage stubs', async function () {
        // Arrange
        let body = { "designation": "test", "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6", "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab" };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        const b = Passage.create({ "designation": req.body.designation, "fromFloor": req.body.fromFloor, "toFloor": req.body.toFloor }, new UniqueEntityID("123"));

        sinon.stub(passageRepo, "save").returns(new Promise<Passage>((resolve, reject) => {
            resolve(b.getValue())
        }));


        const ctrl = new PassageController(passageService as IPassageService);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ "designation": req.body.designation, "fromFloor": req.body.fromFloor, "toFloor": req.body.toFloor }));
    });


    it('passageController + passageService integration test using spy on passageService', async function () {
        // Arrange
        let body = { "designation": "test", "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6", "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab" };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(passageRepo, "save").returns(new Promise<Passage>((resolve, reject) => {
            resolve(Passage.create({ "designation": req.body.designation, "fromFloor": req.body.fromFloor, "toFloor": req.body.toFloor }, new UniqueEntityID("123")).getValue())
        }));


        const passageServiceSpy = sinon.spy(passageService, "createPassage");

        const ctrl = new PassageController(passageService as IPassageService);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ "designation": req.body.designation, "fromFloor": req.body.fromFloor, "toFloor": req.body.toFloor }));
        sinon.assert.calledOnce(passageServiceSpy);
        //sinon.assert.calledTwice(passageServiceSpy);
        sinon.assert.calledWith(passageServiceSpy, sinon.match({ "designation": req.body.designation, "fromFloor": req.body.fromFloor, "toFloor": req.body.toFloor }));
    });

    it('passageController unit test using passageService mock', async function () {
        // Arrange
        let body = { "designation": "test", "fromFloor": "93984d2c-508d-4bf1-9114-41be04b7eab6", "toFloor": "69e977aa-c930-4fa7-9aeb-3ca7aefb5aab" };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>
        };
        let next: Partial<NextFunction> = () => { };

        const passageServiceMock = sinon.mock(passageService)
        passageServiceMock.expects("createPassage")
            .once()
            .withArgs(sinon.match({ name: req.body.name }))
            .returns(Result.ok<IPassageDTO>({
                "domainId": "123",
                "designation": req.body.designation,
                "fromFloor": req.body.fromFloor,
                "toFloor": req.body.toFloor
            }));

        const ctrl = new PassageController(passageService as IPassageService);

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        passageServiceMock.verify();
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
            "domainId": "123",
            "designation": req.body.designation,
            "fromFloor": req.body.fromFloor,
            "toFloor": req.body.toFloor
        }));
    });
});

