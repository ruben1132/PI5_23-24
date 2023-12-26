import { Request, Response, NextFunction } from 'express';

export default interface IFloorController {
    createFloor(req: Request, res: Response, next: NextFunction);
    getFloors(req: Request, res: Response, next: NextFunction);
    getFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
    getFloorsWithPassages(req: Request, res: Response, next: NextFunction);
    updateFloor(req: Request, res: Response, next: NextFunction);
    getFloorById(req: Request, res: Response, next: NextFunction);
    getFloorByCode(req: Request, res: Response, next: NextFunction);
    //   getFloorById(req: Request, res: Response, next: NextFunction);
    deleteFloor(req: Request, res: Response, next: NextFunction);
}