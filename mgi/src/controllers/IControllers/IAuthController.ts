import { Request, Response, NextFunction } from 'express';

export default interface IAuthController {
    session(req: Request, res: Response, next: NextFunction);
    login(req: Request, res: Response, next: NextFunction);
    signup(req: Request, res: Response, next: NextFunction);
    logout(req: Request, res: Response, next: NextFunction);
}
