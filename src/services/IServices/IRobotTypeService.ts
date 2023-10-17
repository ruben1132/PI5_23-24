import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService {

  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  getRobotTypes (): Promise<Result<Array<IRobotTypeDTO>>>;

  updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  deleteRobotType(robotTypeId: string): Promise<Result<void>>;
}
