import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController  {
  getBuildings(req: Request, res: Response, next: NextFunction);
  createBuilding(req: Request, res: Response, next: NextFunction);
  getBuildingsByFloorRange(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
}