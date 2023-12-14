import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassageController from '../../controllers/IControllers/IPassageController';

import config from '../../../config';

// auth
import isAuth from '../middlewares/isAuth';
import authorizeRole from '../middlewares/authorizeRole';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
    app.use('/passages', route);

    // apply isAuth to secure routes that require authentication
    route.use(isAuth);

    // apply attachCurrentUser to attach user information to the request
    route.use(attachCurrentUser);

    // apply authorizeRole to allow only the configured roles
    // route.use(authorizeRole(config.routes.passage.permissions));

    const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

    route.post(
        '',
        authorizeRole(config.routesPermissions.passage.post),
        celebrate({
            body: Joi.object({
                designation: Joi.string().required(),
                fromFloor: Joi.string().required(),
                toFloor: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.createPassage(req, res, next),
    );

    route.get('', authorizeRole(config.routesPermissions.passage.get), (req, res, next) =>
        ctrl.getPassages(req, res, next),
    );

    route.get('/:id', authorizeRole(config.routesPermissions.passage.getById), (req, res, next) =>
        ctrl.getPassageById(req, res, next),
    );

    route.get(
        '/:first/:second',
        authorizeRole(config.routesPermissions.passage.getBetween),
        celebrate({
            params: Joi.object({
                first: Joi.string().required(),
                second: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getPassagesBetweenBuildings(req, res, next),
    );

    route.delete('/:id', authorizeRole(config.routesPermissions.passage.delete), (req, res, next) =>
        ctrl.deletePassage(req, res, next),
    );

    route.put(
        '',
        authorizeRole(config.routesPermissions.passage.put),
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
