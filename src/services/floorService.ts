import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/floor";
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }


    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const floorOrError = await Floor.create(floorDTO);

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

    public async getFloorByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.getFloorByBuildingId(buildingId);
            const floorDTOs = floors.map(floor => FloorMap.toDTO(floor));
            return Result.ok<IFloorDTO[]>(floorDTOs);
        } catch (err) {
            throw err;
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

}
