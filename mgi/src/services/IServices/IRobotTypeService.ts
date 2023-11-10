import { Result } from "../../core/logic/Result";
import { IRobotTypeDTO, IRobotTypeWithTasksDTO } from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService {

  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  getRobotTypes (): Promise<Result<Array<IRobotTypeWithTasksDTO>>>;
  getRobotTypeById(robotTypeId: string): Promise<Result<IRobotTypeWithTasksDTO>>;

  updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  deleteRobotType(robotTypeId: string): Promise<Result<void>>;
}
