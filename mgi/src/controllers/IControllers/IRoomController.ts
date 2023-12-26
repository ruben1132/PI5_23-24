import { Request, Response, NextFunction } from 'express';

export default interface IRoomController {
    createRoom(req: Request, res: Response, next: NextFunction);
    getRooms(req: Request, res: Response, next: NextFunction);
    deleteRoom(req: Request, res: Response, next: NextFunction);
    updateRoom(req: Request, res: Response, next: NextFunction);
    getRoomById(req: Request, res: Response, next: NextFunction);
    getRoomByName(req: Request, res: Response, next: NextFunction);
}
