import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoomController from "./IControllers/IRoomController";
import IRoomService from '../services/IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoomController implements IRoomController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.room.name) private roomServiceInstance: IRoomService
    ) { }

    public async createRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

            if (roomOrError.isFailure) {
                return res.status(400).send({ error: roomOrError.errorValue() });
            }

            const RoomDTO = roomOrError.getValue();
            return res.json(RoomDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const roomsOrError = await this.roomServiceInstance.getRooms() as Result<Array<IRoomDTO>>;

            if (roomsOrError.isFailure) {
                return res.status(400).send({ error: roomsOrError.errorValue() });
            }

            return res.json(roomsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = await this.roomServiceInstance.deleteRoom(req.params.id) as Result<void>;

            if (roomOrError.isFailure) {
                return res.status(400).send({ error: roomOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Room deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }



}