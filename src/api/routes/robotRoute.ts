import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/robots', route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotTypeController;

    route.post(
        '',
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
        (req, res, next) => ctrl.createRobotType(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getRobotTypes(req, res, next));


    route.delete('/:id', (req, res, next) => ctrl.deleteRobotType(req, res, next));
};
