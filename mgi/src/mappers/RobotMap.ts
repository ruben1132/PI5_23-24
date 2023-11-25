import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import { IRobotDTO, IRobotWithRobotTypeDTO } from '../dto/IRobotDTO';
import { Robot } from '../domain/robot';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { RobotIdentification } from '../domain/valueObj/robotIdentification';
import { RobotNickname } from '../domain/valueObj/robotNickname';
import { RobotSerialNumber } from '../domain/valueObj/robotSerialNumber';
import { RobotDescription } from '../domain/valueObj/robotDescription';
import { RobotState } from '../domain/valueObj/robotState';
import { IRobotTypeDTO } from '../dto/IRobotTypeDTO';
import { RobotType } from '../domain/robotType';
import { TaskTypeId } from '../domain/valueObj/taskTypeId';

export class RobotMap extends Mapper<Robot> {
    public static toDTO(robot: Robot): IRobotDTO {
        return {
            id: robot.id.toString(),
            identification: robot.identification.value,
            nickname: robot.nickname.value,
            robotType: robot.robotType.toString(),
            serialNumber: robot.serialNumber.value,
            description: robot.description.value,
            state: robot.state.value,
        } as IRobotDTO;
    }

    public static toDTOWithRobotType(robot: Robot, robotType: RobotType): IRobotWithRobotTypeDTO {
        return {
            id: robot.id.toString(),
            identification: robot.identification.value,
            nickname: robot.nickname.value,
            robotType: {
                id: robotType.id.toString(),
                type: robotType.type.value,
                brand: robotType.brand.value,
                model: robotType.model.value,
                tasksAllowed: robotType.tasksAllowed.map(task => task.toString()),
            } as IRobotTypeDTO,
            serialNumber: robot.serialNumber.value,
            description: robot.description.value,
            state: robot.state.value,
        } as IRobotWithRobotTypeDTO;
    }

    public static toDomain(robot: any | Model<IRobotPersistence & Document>): Robot {
        const robotIdentificationOrError = RobotIdentification.create(robot.identification);
        const robotNicknameOrError = RobotNickname.create(robot.nickname);
        const robotSerialNumberOrError = RobotSerialNumber.create(robot.serialNumber);
        const robotDescriptionOrError = RobotDescription.create(robot.description);
        const robotStateOrError = RobotState.create(robot.state);

        const RobotOrError = Robot.create(
            {
                identification: robotIdentificationOrError.getValue(),
                nickname: robotNicknameOrError.getValue(),
                robotType: robot.robotType,
                serialNumber: robotSerialNumberOrError.getValue(),
                description: robotDescriptionOrError.getValue(),
                state: robotStateOrError.getValue(),
            },
            new UniqueEntityID(robot.domainId),
        );

        RobotOrError.isFailure ? console.log(RobotOrError.errorValue()) : '';

        return RobotOrError.isSuccess ? RobotOrError.getValue() : null;
    }

    public static toPersistence(robot: Robot): any {
        return {
            domainId: robot.id.toString(),
            identification: robot.identification.value,
            nickname: robot.nickname.value,
            robotType: robot.robotType.toString(),
            serialNumber: robot.serialNumber.value,
            description: robot.description.value,
            state: robot.state.value,
        };
    }
}
