import { expect } from 'chai';
import { Container } from 'typedi';
import { Response, Request } from 'express';
import { Result } from '../../src/core/logic/Result';
import BuildingController from '../../src/controllers/buildingController';
import IBuildingDTO from '../../src/dto/IBuildingDTO';
import IBuildingService from '../../src/services/IServices/IBuildingService';

import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';

describe('BuildingController', () => {
    let buildingController: BuildingController;
    let buildingService: IBuildingService;

    beforeEach(() => {
        buildingService = {
            // mock implementation of buildingService methods
            // ...
        } as IBuildingService;

        Container.set('buildingService', buildingService);
        buildingController = Container.get(BuildingController);
    });

    describe('createBuilding', () => {
        it('should return 201 status code and created building', async () => {
            const buildingDTO: IBuildingDTO = {
                id: '1',
                code: 'B1',
                name: 'Building 1',
                dimensions: '100x100',
            };

            const req = {
                body: buildingDTO,
            } as Request;

            const res = {
                status: (statusCode: number) => ({
                    json: (result: Result<IBuildingDTO>) => {
                        expect(statusCode).to.equal(201);
                        expect(result.isSuccess).to.be.true;
                        expect(result.getValue()).to.deep.equal(buildingDTO);
                    },
                }),
            } as Response;

            await buildingController.createBuilding(req, res, () => {});

        });
    });

    describe('getBuildingsByFloorRange', () => {
        it('should return 200 status code and buildings within floor range', async () => {
            const minFloor = 1;
            const maxFloor = 5;

            const req = ({
                query: {
                    minFloor,
                    maxFloor,
                },
            } as unknown) as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

            const res = {
                status: (statusCode: number) => ({
                    json: (result: Result<IBuildingDTO[]>) => {
                        expect(statusCode).to.equal(200);
                        expect(result.isSuccess).to.be.true;
                    },
                }),
            } as Response;

            await buildingController.getBuildingsByFloorRange(req, res, () => {});
        });
    });

    describe('getBuildings', () => {
        it('should return 200 status code and all buildings', async () => {
            const req = {} as Request;

            const res = {
                status: (statusCode: number) => ({
                    json: (result: Result<IBuildingDTO[]>) => {
                        expect(statusCode).to.equal(200);
                        expect(result.isSuccess).to.be.true;
                    },
                }),
            } as Response;

            await buildingController.getBuildings(req, res, () => {});
        });
    });

    describe('deleteBuilding', () => {
        it('should return 204 status code', async () => {
            const req = ({
                params: {
                    id: '1',
                },
            } as unknown) as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

            const res = {
                status: (statusCode: number) => ({
                    send: () => {
                        expect(statusCode).to.equal(204);
                    },
                }),
            } as Response;

            await buildingController.deleteBuilding(req, res, () => {});
        });
    });

    describe('updateBuilding', () => {
        it('should return 200 status code and updated building', async () => {
            const buildingDTO: IBuildingDTO = {
                // mock buildingDTO data
                // ...

                id: '1',
                code: 'B1',
                name: 'Building 1',
                dimensions: '100x100',
            };

            const req = ({
                params: {
                    id: '1',
                },
                body: buildingDTO,
            } as unknown) as Request<ParamsDictionary, any, IBuildingDTO, ParsedQs, Record<string, any>>;

            const res = {
                status: (statusCode: number) => ({
                    json: (result: Result<IBuildingDTO>) => {
                        expect(statusCode).to.equal(200);
                        expect(result.isSuccess).to.be.true;
                        expect(result.getValue()).to.deep.equal(buildingDTO);
                    },
                }),
            } as Response;

            await buildingController.updateBuilding(req, res, () => {});
        });
    });
});
