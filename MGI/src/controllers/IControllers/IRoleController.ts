import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  createRole(req: Request, res: Response, next: NextFunction);
  updateRole(req: Request, res: Response, next: NextFunction);

  getRoles(req: Request, res: Response, next: NextFunction);
  getRoleById(req: Request, res: Response, next: NextFunction);

  deleteRole(req: Request, res: Response, next: NextFunction);
}