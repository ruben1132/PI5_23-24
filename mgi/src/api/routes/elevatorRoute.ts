import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post('',
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        floorsAllowed: Joi.array().required()
      })
    }),
    (req, res, next) => ctrl.createElevator(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getElevators(req, res, next));

    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.getElevatorById(req, res, next));

  /*route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        code: Joi.string().required(),
        name: Joi.string().allow('', null),
        dimensions: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next));*/

    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.deleteElevator(req, res, next));
};
