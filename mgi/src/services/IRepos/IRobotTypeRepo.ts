import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import { RobotTypeId } from "../../domain/valueObj/robotTypeId";

export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType>;
    getRobotTypes(): Promise<RobotType[]>;
    getRobotTypeById(robotTypeId: string): Promise<RobotType>;

    deleteRobotType(robotTypeId: string): Promise<Boolean>;

}
