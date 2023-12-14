import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from '../../../config';

// auth
import authorizeRole from '../middlewares/authorizeRole';

const route = Router();

export default (app: Router) => {
    app.use('/robots', route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

    route.post(
        '',
        authorizeRole(config.routesPermissions.robot.post),
        celebrate({
            body: Joi.object({
                identification: Joi.string().required(),
                nickname: Joi.string().required(),
                robotType: Joi.string().required(),
                serialNumber: Joi.string().required(),
                description: Joi.string().required(),
                state: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.createRobot(req, res, next),
    );

    route.patch(
        '',
        authorizeRole(config.routesPermissions.robot.patch),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.inhibitRobot(req, res, next),
    );

    route.put(
        '',
        authorizeRole(config.routesPermissions.robot.put),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                identification: Joi.string().required(),
                nickname: Joi.string().required(),
                robotType: Joi.string().required(),
                serialNumber: Joi.string().required(),
                description: Joi.string().required(),
                state: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.updateRobot(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.robot.get), (req, res, next) =>
        ctrl.getRobots(req, res, next),
    );

    route.get('/:id', authorizeRole(config.routesPermissions.robot.getById), (req, res, next) =>
        ctrl.getRobotById(req, res, next),
    );

    route.delete('/:id', authorizeRole(config.routesPermissions.robot.delete), (req, res, next) =>
        ctrl.deleteRobot(req, res, next),
    );
};
