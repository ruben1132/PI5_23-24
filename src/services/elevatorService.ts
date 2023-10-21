import { Service, Inject } from 'typedi';
import config from "../../config";
import IElevatorDTO from '../dto/IElevatorDTO';
import { Elevator } from "../domain/elevator";
import { Floor } from '../domain/floor';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IElevatorService from './IServices/IElevatorService';
import { Result } from "../core/logic/Result";
import { ElevatorMap } from "../mappers/ElevatorMap";
import { ElevatorDesignation } from '../domain/valueObj/elevatorDesignation';

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    ) { }

    public async getElevators(): Promise<Result<Array<IElevatorDTO>>> {
        try {
            const roles = await this.elevatorRepo.getElevators();

            if (roles === null) {
                return Result.fail<Array<IElevatorDTO>>("Elevators not found");
            }
            else {
                const elevatorsDTOResult = roles.map(elevator => ElevatorMap.toDTO(elevator) as IElevatorDTO);
                return Result.ok<Array<IElevatorDTO>>(elevatorsDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {

            let fAllowed: Floor[] = [];

            for (const floorId of elevatorDTO.floorsAllowed) {
                // check if floor exists
                const floorOrError = await this.getFloor(floorId);
                if (floorOrError.isFailure) {
                    return Result.fail<IElevatorDTO>(floorOrError.errorValue());
                } else {
                    fAllowed.push(floorOrError.getValue());
                }
            }
            

            const designation = await ElevatorDesignation.create(elevatorDTO.designation);
            if (designation.isFailure) {
                return Result.fail<IElevatorDTO>(designation.errorValue());
            }

            const elevatorOrError = await Elevator.create(
                {
                    designation: designation.getValue(),
                    floorsAllowed: fAllowed
                }
            );            

            if (elevatorOrError.isFailure) {
                return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }

            const elevatorResult = elevatorOrError.getValue();

            await this.elevatorRepo.save(elevatorResult);

            
            const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult);
            return Result.ok<IElevatorDTO>(elevatorDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async deleteElevator(elevatorId: string): Promise<Result<void>> {
        try {
            const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

            if (elevator === null) {
                return Result.fail<void>("Elevator not found");
            }

            await this.elevatorRepo.deleteElevator(elevatorId);

            return Result.ok<void>();

        } catch (e) {
            throw e;
        }
    };

    // check if floor exists
    private async getFloor(floorId: string): Promise<Result<Floor>> {

        const floor = await this.floorRepo.findByDomainId(floorId);
        const found = !!floor;

        if (found) {
            return Result.ok<Floor>(floor);
        } else {
            return Result.fail<Floor>("Couldn't find floor by id=" + floorId);
        }
    }

}
