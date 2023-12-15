import { Router } from 'express';

import { Container } from 'typedi';
import IFloorMapController from '../../controllers/IControllers/IFloorMapController';

import config from '../../../config';

// auth
import authorizeRole from '../middlewares/authorizeRole';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

export default (app: Router) => {
    app.use('/floorMaps', route);

    const ctrl = Container.get(config.controllers.floorMap.name) as IFloorMapController;

    route.patch(
        '',
        authorizeRole(config.routesPermissions.floorMap.patch),
        upload.single('jsonFile'),
        (req, res, next) => ctrl.createFloorMap(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.floorMap.patch), (req, res, next) =>
        ctrl.getFloorMaps(req, res, next),
    );

    //ger floorMaps by building id
    route.get('/floor/:id',authorizeRole(config.routesPermissions.floorMap.getByFloorId), (req, res, next) =>
        ctrl.getFloorMapByFloorId(req, res, next),
    );
};
