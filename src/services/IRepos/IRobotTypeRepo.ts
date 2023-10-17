import { get } from "lodash";
import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import { Building } from "../../domain/building";
import { RobotTypeId } from "../../domain/valueObj/robotTypeId";

export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType>;
    getRobotTypes(): Promise<RobotType[]>;

    deleteRobotType(robotTypeId: string): Promise<Boolean>;

}
