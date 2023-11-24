import { Request, Response, NextFunction } from 'express';

export default interface ITaskController {
    createTask(req: Request, res: Response, next: NextFunction);
    getTask(req: Request, res: Response, next: NextFunction);
    // getFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
    // getFloorsWithPassages(req: Request, res: Response, next: NextFunction);
    updateTask(req: Request, res: Response, next: NextFunction);
    getTaskById(req: Request, res: Response, next: NextFunction);
    //   getFloorById(req: Request, res: Response, next: NextFunction);
    deleteTask(req: Request, res: Response, next: NextFunction);
}