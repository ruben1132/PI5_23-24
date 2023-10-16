import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorMapController from '../../controllers/IControllers/IFloorMapController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/floorMaps', route);

    const ctrl = Container.get(config.controllers.floorMap.name) as IFloorMapController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                floor: Joi.string().required(),
                map: Joi.array().required(),
                fmRooms: Joi.array().items(
                    Joi.object({
                        roomId: Joi.string().required(),
                        startX: Joi.number().required(),
                        startY: Joi.number().required(),
                        endX: Joi.number().required(),
                        endY: Joi.number().required(),
                    }),
                ),
                fmDoors: Joi.array().items(
                    Joi.object({
                        positionX: Joi.number().required(),
                        positionY: Joi.number().required(),
                        direction: Joi.string().required(),
                    }),
                ),
                fmElevator: Joi.object({
                    elevatorId: Joi.string().required(),
                    positionX: Joi.number().required(),
                    positionY: Joi.number().required(),
                    direction: Joi.string().required(),
                }),
                fmPassages: Joi.array().items(
                    Joi.object({
                        passageId: Joi.string().required(),
                        positionX: Joi.number().required(),
                        positionY: Joi.number().required(),
                        direction: Joi.string().required(),
                    }),
                ),
            }),
        }),
        (req, res, next) => ctrl.createFloorMap(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getFloorMaps(req, res, next));

    //ger floorMaps by building id
    route.get('/floor/:id', (req, res, next) => ctrl.getFloorMapByFloorId(req, res, next));

    //   route.put('',
    //     celebrate({
    //       body: Joi.object({
    //         id: Joi.string().required(),
    //         designation: Joi.string().required()
    //       }),
    //     }),
    //     (req, res, next) => ctrl.updateFloorMap(req, res, next) );
};
