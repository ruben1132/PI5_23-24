import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
    createUser(req: Request, res: Response, next: NextFunction);
    getUsers(req: Request, res: Response, next: NextFunction);
    updateUser(req: Request, res: Response, next: NextFunction);
    getUserById(req: Request, res: Response, next: NextFunction);
    deleteUser(req: Request, res: Response, next: NextFunction);
    login(req: Request, res: Response, next: NextFunction);
    logout(req: Request, res: Response, next: NextFunction);
}