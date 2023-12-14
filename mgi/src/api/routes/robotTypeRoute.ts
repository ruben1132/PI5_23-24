import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';

// auth
import authorizeRole from '../middlewares/authorizeRole';

const route = Router();

export default (app: Router) => {
    app.use('/robotTypes', route);

    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    route.post(
        '',
        authorizeRole(config.routesPermissions.robotType.post),
        celebrate({
            body: Joi.object({
                type: Joi.string().required(),
                brand: Joi.string().required(),
                model: Joi.string().required(),
                tasksAllowed: Joi.array()
                    .items(Joi.string())
                    .required(),
            }),
        }),
        (req, res, next) => ctrl.createRobotType(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.robotType.get), (req, res, next) =>
        ctrl.getRobotTypes(req, res, next),
    );

    route.get('/:id', authorizeRole(config.routesPermissions.robotType.getById), (req, res, next) =>
        ctrl.getRobotTypeById(req, res, next),
    );

    route.put(
        '',
        authorizeRole(config.routesPermissions.robotType.put),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                type: Joi.string().required(),
                brand: Joi.string().required(),
                model: Joi.string().required(),
                tasksAllowed: Joi.array()
                    .items(Joi.string())
                    .required(),
            }),
        }),
        (req, res, next) => ctrl.updateRobotType(req, res, next),
    );

    route.delete('/:id', authorizeRole(config.routesPermissions.robotType.delete), (req, res, next) =>
        ctrl.deleteRobotType(req, res, next),
    );
};
