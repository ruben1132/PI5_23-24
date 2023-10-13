import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/floor";
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";
import { Building } from '../domain/building';

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
                return Result.fail<IFloorDTO>(buildingOrError.error);
            } else {
                building = buildingOrError.getValue();
            }

            const floorOrError = await Floor.create({
                number: floorDTO.number,
                information: floorDTO.information,
                building: building
            });

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
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
            }
            else {
                const floorsDTOResult = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
                return Result.ok<Array<IFloorDTO>>(floorsDTOResult)
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

}


