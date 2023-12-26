import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController';

import config from '../../../config';

// auth
import authorizeRole from '../middlewares/authorizeRole';

const route = Router();

export default (app: Router) => {
    app.use('/floors', route);

    const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

    route.post(
        '',
        authorizeRole(config.routesPermissions.floor.post),
        celebrate({
            body: Joi.object({
                building: Joi.string().required(),
                number: Joi.number().required(),
                information: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createFloor(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.floor.get), (req, res, next) =>
        ctrl.getFloors(req, res, next),
    );

    //get floors with passages
    route.get('/withpass/', authorizeRole(config.routesPermissions.floor.getWithPass), (req, res, next) =>
        ctrl.getFloorsWithPassages(req, res, next),
    );

    //get floors by building id
    route.get('/buildingId/:id', authorizeRole(config.routesPermissions.floor.getByBuildingId), (req, res, next) =>
        ctrl.getFloorsByBuildingId(req, res, next),
    );

    route.get('/:id', authorizeRole(config.routesPermissions.floor.getById), (req, res, next) =>
        ctrl.getFloorById(req, res, next),
    );

    route.get('/code/:code', authorizeRole(config.routesPermissions.floor.getByCode), (req, res, next) =>
        ctrl.getFloorByCode(req, res, next),
    );


    route.put(
        '',
        authorizeRole(config.routesPermissions.floor.put),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                building: Joi.string().required(),
                number: Joi.number().required(),
                information: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateFloor(req, res, next),
    );

    route.delete('/:id', authorizeRole(config.routesPermissions.floor.delete), (req, res, next) =>
        ctrl.deleteFloor(req, res, next),
    );
};
