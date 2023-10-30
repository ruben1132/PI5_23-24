import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.role.name) private roleServiceInstance: IRoleService
    ) { }

    public async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;

            if (roleOrError.isFailure) {
                return res.status(402).send();
            }

            const roleDTO = roleOrError.getValue();
            return res.json(roleDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

            if (roleOrError.isFailure) {
                return res.status(404).send({ error: roleOrError.errorValue() });
            }

            const roleDTO = roleOrError.getValue();
            return res.status(201).json(roleDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const rolesOrError = await this.roleServiceInstance.getRoles() as Result<Array<IRoleDTO>>;

            if (rolesOrError.isFailure) {
                return res.status(400).send({ error: rolesOrError.errorValue() });
            }

            return res.json(rolesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getRoleById(req: Request, res: Response, next: NextFunction) {
        try {
            const roleOrError = await this.roleServiceInstance.getRoleById(req.params.id) as Result<IRoleDTO>;

            if (roleOrError.isFailure) {
                return res.status(400).send({ error: roleOrError.errorValue() });
            }

            return res.json(roleOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteRole(req: Request, res: Response, next: NextFunction) {

        try {
            const roleOrError = await this.roleServiceInstance.deleteRole(req.params.id) as Result<void>;

            if (roleOrError.isFailure) {
                return res.status(400).send({ error: roleOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Role deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }

}
