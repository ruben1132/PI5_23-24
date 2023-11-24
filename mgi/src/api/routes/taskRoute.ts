import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITaskController from '../../controllers/IControllers/ITaskController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/floors', route);

    const ctrl = Container.get(config.controllers.floor.name) as ITaskController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                building: Joi.string().required(),
                number: Joi.number().required(),
                information: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createTask(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getTask(req, res, next));


    route.get('/:id', (req, res, next) => ctrl.getTaskById(req, res, next));

    

    route.put(
        '',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                building: Joi.string().required(),
                number: Joi.number().required(),
                information: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateTask(req, res, next),
    );

    route.delete('/:id', (req, res, next) => ctrl.deleteTask(req, res, next));
};
