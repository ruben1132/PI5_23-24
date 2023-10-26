import PassageController from '../../src/controllers/passageController';
import IPassageDTO from '../../src/dto/IPassageDTO';
import IPassageService from '../../src/services/IServices/IPassageService';
import { Result } from '../../src/core/logic/Result';
import { Request, Response, NextFunction } from 'express';
import jest from 'jest';

describe('PassageController', () => {
    let passageController: PassageController;
    let passageService: IPassageService;

    beforeEach(() => {
        passageService = {
            createPassage: jest.fn(),
            getPassages: jest.fn(),
            getPassagesBetweenBuildings: jest.fn(),
            updatePassage: jest.fn(),
            deletePassage: jest.fn(),
        };
        passageController = new PassageController(passageService);
    });

    describe('createPassage', () => {
        it('should return 201 status code and the created passage when successful', async () => {
            const passageDTO: IPassageDTO = {
                domainId: '1',
                designation: 'Passage 1',
                fromFloor: 'A',
                toFloor: 'B',
            };
            const expectedResult = Promise.resolve(Result.ok<IPassageDTO>(passageDTO));
            jest.spyOn(passageService, 'createPassage').mockResolvedValue(expectedResult);

            const req = { body: passageDTO } as Request;
            const res = ({ json: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.createPassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(passageDTO);
        });

        it('should return 400 status code and the error message when unsuccessful', async () => {
            const errorMessage = 'Error creating passage';
            const expectedResult = Result.fail<IPassageDTO>(errorMessage);
            jest.spyOn(passageService, 'createPassage').mockResolvedValue(Promise.resolve(expectedResult));

            const req = { body: {} } as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.createPassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getPassages', () => {
        it('should return 200 status code and the passages when successful', async () => {
            const passagesDTO: IPassageDTO[] = [
                {
                    domainId: '1',
                    designation: 'Passage 1',
                    fromFloor: 'A',
                    toFloor: 'B',
                },
                {
                    domainId: '2',
                    designation: 'Passage 2',
                    fromFloor: 'B',
                    toFloor: 'C',
                },
            ];
            const expectedResult = Result.ok<IPassageDTO[]>(passagesDTO);
            jest.spyOn(passageService, 'getPassages').mockResolvedValue(Promise.resolve(expectedResult));

            const req = {} as Request;
            const res = ({ json: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.getPassages(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(passagesDTO);
        });

        it('should return 400 status code and the error message when unsuccessful', async () => {
            const errorMessage = 'Error getting passages';
            const expectedResult = Result.fail<IPassageDTO[]>(errorMessage);
            jest.spyOn(passageService, 'getPassages').mockResolvedValue(Promise.resolve(expectedResult));

            const req = {} as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.getPassages(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getPassagesBetweenBuildings', () => {
        it('should return 200 status code and the passages when successful', async () => {
            const passagesDTO: IPassageDTO[] = [
                {
                    domainId: '1',
                    designation: 'Passage 1',
                    fromFloor: 'A',
                    toFloor: 'B',
                },
                {
                    domainId: '2',
                    designation: 'Passage 2',
                    fromFloor: 'B',
                    toFloor: 'C',
                },
            ];
            const expectedResult = Result.ok<IPassageDTO[]>(passagesDTO);
            jest.spyOn(passageService, 'getPassagesBetweenBuildings').mockResolvedValue(
                Promise.resolve(expectedResult),
            );

            const req = ({ params: { first: 'A', second: 'B' } } as unknown) as Request;
            const res = ({ json: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.getPassagesBetweenBuildings(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(passagesDTO);
        });

        it('should return 400 status code and the error message when unsuccessful', async () => {
            const errorMessage = 'Error getting passages between buildings';
            const expectedResult = Result.fail<IPassageDTO[]>(errorMessage);
            jest.spyOn(passageService, 'getPassagesBetweenBuildings').mockResolvedValue(
                Promise.resolve(expectedResult),
            );

            const req = ({ params: { first: 'A', second: 'B' } } as unknown) as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.getPassagesBetweenBuildings(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('updatePassage', () => {
        it('should return 201 status code and the updated passage when successful', async () => {
            const passageDTO: IPassageDTO = {
                domainId: '1',
                designation: 'Passage 1',
                fromFloor: 'A',
                toFloor: 'B',
            };
            const expectedResult = Result.ok<IPassageDTO>(passageDTO);
            jest.spyOn(passageService, 'updatePassage').mockResolvedValue(Promise.resolve(expectedResult));

            const req = { body: passageDTO } as Request;
            const res = ({ json: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.updatePassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(passageDTO);
        });

        it('should return 404 status code and the error message when unsuccessful', async () => {
            const errorMessage = 'Error updating passage';
            const expectedResult = Result.fail<IPassageDTO>(errorMessage);
            jest.spyOn(passageService, 'updatePassage').mockResolvedValue(Promise.resolve(expectedResult));

            const req = { body: {} } as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.updatePassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('deletePassage', () => {
        it('should return 200 status code and a success message when successful', async () => {
            const expectedResult = Result.ok<void>();
            jest.spyOn(passageService, 'deletePassage').mockResolvedValue(Promise.resolve(expectedResult));

            const req = ({ params: { id: '1' } } as unknown) as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.deletePassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ Success: 'Passage deleted successfully' });
        });

        it('should return 400 status code and the error message when unsuccessful', async () => {
            const errorMessage = 'Error deleting passage';
            const expectedResult = Result.fail<void>(errorMessage);
            jest.spyOn(passageService, 'deletePassage').mockResolvedValue(Promise.resolve(expectedResult));

            const req = ({ params: { id: '1' } } as unknown) as Request;
            const res = ({ send: jest.fn(), status: jest.fn() } as unknown) as Response;
            const next = (jest.fn() as unknown) as NextFunction;

            await passageController.deletePassage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});
