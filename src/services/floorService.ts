import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/floor";
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";
import { Building } from '../domain/building';
import { FloorNumber } from '../domain/valueObj/floorNumber';
import { FloorInformation } from '../domain/valueObj/floorInformation';

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
    ) { }


    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            // check if building exists
            let building: Building;
            const buildingOrError = await this.getBuilding(floorDTO.building);
            if (buildingOrError.isFailure) {
                return Result.fail<IFloorDTO>(buildingOrError.errorValue());
            } else {
                building = buildingOrError.getValue();
            }

            const number = await FloorNumber.create(floorDTO.number);
            if (number.isFailure) {
                return Result.fail<IFloorDTO>(number.errorValue());
            }

            const information = await FloorInformation.create(floorDTO.information);
            if (information.isFailure) {
                return Result.fail<IFloorDTO>(information.errorValue());
            }

            const floorOrError = await Floor.create({
                number: number.getValue(),
                information: information.getValue(),
                building: building
            });

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            // console.log('FloorService.createFloor - floorResult: ', floorResult);
            const floorDTOResult = FloorMap.toDTO(floorResult) ;

            return Result.ok<IFloorDTO>(floorDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getFloors(): Promise<Result<Array<IFloorDTO>>> {    
        try {
            const floors = await this.floorRepo.getFloors();

            if (floors === null) {
                return Result.fail<Array<IFloorDTO>>("Floors not found");
            } else {
                const floorsDTOResult = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
                return Result.ok<Array<IFloorDTO>>(floorsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }


    public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.getFloorsByBuildingId(buildingId);

            if (floors === null) {
                return Result.fail<IFloorDTO[]>("Floors not found");
            } else {
                const floorsDTOResult = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
                return Result.ok<IFloorDTO[]>(floorsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    // check if building exists
    private async getBuilding(buildingId: string): Promise<Result<Building>> {

        const building = await this.buildingRepo.findByDomainId(buildingId);
        const found = !!building;

        if (found) {
            return Result.ok<Building>(building);
        } else {
            return Result.fail<Building>("Couldn't find building by id=" + buildingId);
        }
    }

    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }

            const number = await FloorNumber.create(floorDTO.number);
            if (number.isFailure) {
                return Result.fail<IFloorDTO>(number.errorValue());
            }

            const information = await FloorInformation.create(floorDTO.information);
            if (information.isFailure) {
                return Result.fail<IFloorDTO>(information.errorValue());
            }

            const building = await this.buildingRepo.findByDomainId(floorDTO.building);
            if (building === null) {
                return Result.fail<IFloorDTO>("Building not found");
            }


            floor.number = number.getValue();
            floor.information = information.getValue();
            floor.building = building;

            await this.floorRepo.save(floor);

            console.log('FloorService.updateFloor - floor: ', floor);
            const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;

            return Result.ok<IFloorDTO>(floorDTOResult)
        } catch (e) {
            throw e;
        }
    }

}


