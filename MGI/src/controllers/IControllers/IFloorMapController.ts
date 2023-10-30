import { Request, Response, NextFunction } from 'express';

export default interface IFloorMapController {
    createFloorMap(req: Request, res: Response, next: NextFunction);
    getFloorMaps(req: Request, res: Response, next: NextFunction);
    getFloorMapByFloorId(req: Request, res: Response, next: NextFunction);

    //   updateFloorMap(req: Request, res: Response, next: NextFunction);
    //   getFloorMapById(req: Request, res: Response, next: NextFunction);
    //   deleteFloorMap(req: Request, res: Response, next: NextFunction);
}