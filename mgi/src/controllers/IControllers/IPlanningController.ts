import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController {
    findPath(req: Request, res: Response, next: NextFunction);
}
