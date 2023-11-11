import { Result } from '../../core/logic/Result';
import { IElevatorDTO, IElevatorWithFloorsDTO } from '../../dto/IElevatorDTO';

export default interface IElevatorService {
    getElevators(): Promise<Result<Array<IElevatorDTO>>>;
    createElevator(ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    //updateElevator(ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    deleteElevator(elevatorId: string): Promise<Result<void>>;

    getElevatorById(elevatorId: string): Promise<Result<IElevatorWithFloorsDTO>>;
}
