import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import { RobotId } from "../../domain/valueObj/robotId";

export default interface IRobotRepo extends Repo<Robot> {
    save(robot: Robot): Promise<Robot>;
    findByDomainId(robotId: RobotId | string): Promise<Robot>;
    getRobots(): Promise<Robot[]>;

    deleteRobot(robotId: string): Promise<Boolean>;

}
