import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassageController from '../../controllers/IControllers/IPassageController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/passages', route);

    const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                designation: Joi.string().required(),
                fromFloor: Joi.string().required(),
                toFloor: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createPassage(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getPassages(req, res, next));

    route.get(
        '/:first/:second',
        celebrate({
            params: Joi.object({
                first: Joi.string().required(),
                second: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getPassagesBetweenBuildings(req, res, next),
    );

    route.delete('/:id', (req, res, next) => ctrl.deletePassage(req, res, next));

    route.put(
        '',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                designation: Joi.string().required(),
                fromFloor: Joi.string().required(),
                toFloor: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updatePassage(req, res, next),
    );

};
