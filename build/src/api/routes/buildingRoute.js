"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/buildings', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.building.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            designation: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => ctrl.createBuilding(req, res, next));
    route.get('/ranges/:min/:max', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            min: celebrate_1.Joi.string().required(),
            max: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => ctrl.getBuildingsByFloorRange(req, res, next));
    route.get('', (req, res, next) => ctrl.getBuildings(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            designation: celebrate_1.Joi.string().required()
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
};
//# sourceMappingURL=buildingRoute.js.map