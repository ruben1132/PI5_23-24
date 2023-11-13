import { Repo } from '../../core/infra/Repo';
import { Elevator } from '../../domain/elevator';
import { ElevatorId } from '../../domain/valueObj/elevatorId';

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    findByDomainId(elevatorId: ElevatorId | string): Promise<Elevator>;

    getElevators(): Promise<Elevator[]>;
    deleteElevator(elevatorId: ElevatorId | string): Promise<boolean>;

    findByIds(elevatorsIds: ElevatorId[]): Promise<Elevator[]>;

    getElevatorById(elevatorId: ElevatorId | string): Promise<Elevator>;
    //saveCollection (elevators: Elevator[]): Promise<Elevator[]>;
    //removeByElevatorIds (elevators: ElevatorId[]): Promise<any>

    updateElevator(elevator: Elevator): Promise<Elevator>;
}
