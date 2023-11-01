import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorMapController from '../../controllers/IControllers/IFloorMapController';

import config from '../../../config';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

export default (app: Router) => {
    app.use('/floorMaps', route);

    const ctrl = Container.get(config.controllers.floorMap.name) as IFloorMapController;

    route.patch(
        '',
        upload.single('jsonFile'),                 
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
