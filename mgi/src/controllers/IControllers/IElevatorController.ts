import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController {
    getElevators(req: Request, res: Response, next: NextFunction);
    createElevator(req: Request, res: Response, next: NextFunction);
    //updateElevator(req: Request, res: Response, next: NextFunction);
    deleteElevator(req: Request, res: Response, next: NextFunction);

    getElevatorById(req: Request, res: Response, next: NextFunction);
}
