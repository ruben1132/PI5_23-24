import { Request, Response, NextFunction } from 'express';

export default interface ITaskTypeController {
    createTaskType(req: Request, res: Response, next: NextFunction);
    getTaskTypes(req: Request, res: Response, next: NextFunction);

    updateTaskType(req: Request, res: Response, next: NextFunction);
    deleteTaskType(req: Request, res: Response, next: NextFunction);
}
