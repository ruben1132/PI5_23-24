import { RobotType } from './RobotType';

export interface Robot {
    id: string;
    identification: string;
    nickname: string;
    robotType: string;
    serialNumber: string;
    description: string;
    state: boolean;
}

export interface RobotWithRobotType {
    id: string;
    identification: string;
    nickname: string;
    robotType: RobotType;
    serialNumber: string;
    description: string;
    state: boolean;
}
