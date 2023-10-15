import { Service, Inject } from 'typedi';
import config from "../../config";
import IElevatorDTO from '../dto/IElevatorDTO';
import { Elevator } from "../domain/elevator";
import IBuildingRepo from './IRepos/IBuildingRepo';
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
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
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

            const elevatorDM = ElevatorMap.toDomain(elevatorDTO);

            const elevatorOrError = await Elevator.create(
                {
                    designation: elevatorDM.elevatorDesignation,
                    building: elevatorDM.building
                    //floorsAllowed: elevatorDM,
                }
            );

            if (elevatorOrError.isFailure) {
                return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }

            const elevatorResult = elevatorOrError.getValue();

            const test = await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult)
        } catch (e) {
            throw e;
        }
    }

    /*public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

            if (building === null) {
                return Result.fail<IBuildingDTO>("Building not found");
            }

            const code = await BuildingCode.create(buildingDTO.code);
            if (code.isFailure) {
                return Result.fail<IBuildingDTO>(code.errorValue());
            }

            const name = await BuildingName.create(buildingDTO.name);
            if (name.isFailure) {
                return Result.fail<IBuildingDTO>(name.errorValue());
            }

            const dimensions = await BuildingDimensions.create(buildingDTO.dimensions);
            if (dimensions.isFailure) {
                return Result.fail<IBuildingDTO>(dimensions.errorValue());
            }

            building.code = code.getValue();
            building.name = name.getValue();
            building.dimensions = dimensions.getValue();

            await this.buildingRepo.save(building);
            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;

            return Result.ok<IBuildingDTO>(buildingDTOResult)

        } catch (e) {
            throw e;
        }
    }*/

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

}
