import { Result } from "../../core/logic/Result";
import {IRobotDTO, IRobotWithRobotTypeDTO} from "../../dto/IRobotDTO";

export default interface IRobotService {

  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  getRobots (taskTypeId : string, identification : string): Promise<Result<Array<IRobotWithRobotTypeDTO>>>;
  inhibitRobot(robotId: string): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  deleteRobot(robotId: string): Promise<Result<void>>;
  getRobotById(robotId: string): Promise<Result<IRobotWithRobotTypeDTO>>;
}
