import { Request, Response, NextFunction } from 'express';

export default interface IPassageController {
    createPassage(req: Request, res: Response, next: NextFunction);
    getPassages(req: Request, res: Response, next: NextFunction);
    getPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction);
    deletePassage(req: Request, res: Response, next: NextFunction);
    updatePassage(req: Request, res: Response, next: NextFunction);
}