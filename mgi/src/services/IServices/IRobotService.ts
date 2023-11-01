import { Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService {

  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  getRobots (): Promise<Result<Array<IRobotDTO>>>;
  inhibitRobot(robotId: string): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  deleteRobot(robotId: string): Promise<Result<void>>;
}
