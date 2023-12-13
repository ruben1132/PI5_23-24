import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import config from '../../../config';

// auth
import isAuth from '../middlewares/isAuth';
import authorizeRole from '../middlewares/authorizeRole';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
    app.use('/buildings', route);

    // apply isAuth to secure routes that require authentication
    route.use(isAuth);

    // apply attachCurrentUser to attach user information to the request
    route.use(attachCurrentUser);

    // apply authorizeRole to allow only 'gestor campus' role
    route.use(authorizeRole(['gestor campus']));

    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                name: Joi.string().allow('', null),
                dimensions: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createBuilding(req, res, next),
    );

    route.get(
        '/ranges/:min/:max',
        celebrate({
            params: Joi.object({
                min: Joi.number().required(),
                max: Joi.number().required(),
            }),
        }),
        (req, res, next) => ctrl.getBuildingsByFloorRange(req, res, next),
    );

    route.get(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getBuildingById(req, res, next),
    );

    route.get('', (req, res, next) => ctrl.getBuildings(req, res, next));

    route.put(
        '',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                code: Joi.string().required(),
                name: Joi.string().allow('', null),
                dimensions: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateBuilding(req, res, next),
    );

    route.delete(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteBuilding(req, res, next),
    );
};
