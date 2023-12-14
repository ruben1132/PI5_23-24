import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import config from '../../../config';

// auth
import authorizeRole from '../middlewares/authorizeRole';

const route = Router();

export default (app: Router) => {
    app.use('/elevators', route);

    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

    route.post(
        '',
        authorizeRole(config.routesPermissions.elevator.post),
        celebrate({
            body: Joi.object({
                designation: Joi.string().required(),
                floorsAllowed: Joi.array().required(),
            }),
        }),
        (req, res, next) => ctrl.createElevator(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.elevator.get), (req, res, next) =>
        ctrl.getElevators(req, res, next),
    );

    route.get(
        '/:id',
        authorizeRole(config.routesPermissions.elevator.getById),
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getElevatorById(req, res, next),
    );

    route.delete(
        '/:id',
        authorizeRole(config.routesPermissions.elevator.delete),
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteElevator(req, res, next),
    );

    route.put(
        '',
        authorizeRole(config.routesPermissions.elevator.put),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                designation: Joi.string().required(),
                floorsAllowed: Joi.array().required(),
            }),
        }),
        (req, res, next) => ctrl.updateElevator(req, res, next),
    );
};
