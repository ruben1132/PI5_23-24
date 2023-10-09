import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/Floor";
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.Floor.name) private FloorRepo: IFloorRepo
    ) { }

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<Floor>> {
        try {
            const floorOrError = Floor.create(floorDTO);

            if (floorOrError.isFailure) {
                return Result.fail<Floor>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.FloorRepo.save(floorResult);

            return Result.ok<Floor>(floorResult);
        } catch (err) {
            throw err;
        }
    }

    public async getFloorByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.FloorRepo.getFloorByBuildingId(buildingId);
            const floorDTOs = floors.map(floor => FloorMap.toDTO(floor));
            return Result.ok<IFloorDTO[]>(floorDTOs);
        } catch (err) {
            throw err;
        }
    }



}
