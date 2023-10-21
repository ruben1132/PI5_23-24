import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/robotTypes', route);

    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                type: Joi.string().required(),
                brand: Joi.string().required(),
                model: Joi.string().required(),
                tasksAllowed: Joi.array().items(Joi.string()).required(),
            }),
        }),
        (req, res, next) => ctrl.createRobotType(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getRobotTypes(req, res, next));

    // route.put(
    //     '',
    //     celebrate({
    //         body: Joi.object({
    //             domainId: Joi.string().required(),
    //             type: Joi.string().required(),
    //             brand: Joi.string().required(),
    //             model: Joi.string().required(),
    //             tasksAvailable: Joi.array().items(Joi.string()).required(),
    //         }),
    //     }),
    //     (req, res, next) => ctrl.updateRobotType(req, res, next),
    // );

    route.delete('/:id', (req, res, next) => ctrl.deleteRobotType(req, res, next));
};
