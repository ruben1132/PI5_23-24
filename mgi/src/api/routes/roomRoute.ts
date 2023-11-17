import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoomController from '../../controllers/IControllers/IRoomController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/rooms', route);

    const ctrl = Container.get(config.controllers.room.name) as IRoomController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                number: Joi.string().required(),
                floor: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createRoom(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getRooms(req, res, next));

    route.get('/:id', (req, res, next) => ctrl.getRoomById(req, res, next));

    route.put(
        '',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                number: Joi.string().required(),
                floor: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateRoom(req, res, next),
    );

    route.delete(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteRoom(req, res, next),
    );
};
