import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController {
    createRobotType(req: Request, res: Response, next: NextFunction);
    getRobotTypes(req: Request, res: Response, next: NextFunction);

    updateRobotType(req: Request, res: Response, next: NextFunction);
    deleteRobotType(req: Request, res: Response, next: NextFunction);
}
