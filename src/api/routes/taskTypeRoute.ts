import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITaskTypeController from '../../controllers/IControllers/ITaskTypeController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/taskTypes', route);

    const ctrl = Container.get(config.controllers.taskType.name) as ITaskTypeController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createTaskType(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getTaskTypes(req, res, next));

    route.put(
        '',
        celebrate({
            body: Joi.object({
                domainId: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateTaskType(req, res, next),
    );

    route.delete('/:id', (req, res, next) => ctrl.deleteTaskType(req, res, next));
};
