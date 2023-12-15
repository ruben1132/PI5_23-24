import { Router } from 'express';

import { Container } from 'typedi';
import IPlanningController from '../../controllers/IControllers/IPlanningController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/planning', route);

    const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;


    route.get('/findPath', (req, res, next) => ctrl.findPath(req, res, next));

  
};
