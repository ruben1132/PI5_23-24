import { Service, Inject } from 'typedi';
import config from '../../config';
import { IFloorDTO, IFloorWithBuildingDTO } from '../dto/IFloorDTO';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from '../core/logic/Result';
import { FloorMap } from '../mappers/FloorMap';
import { Building } from '../domain/building';
import { FloorInformation } from '../domain/valueObj/floorInformation';
import { BuildingId } from '../domain/valueObj/buildingId';

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    ) {}

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            // check if building exists
            const buildingOrError = await this.getBuilding(floorDTO.building);
            if (buildingOrError.isFailure) {
                return Result.fail<IFloorDTO>(buildingOrError.errorValue());
            }
            let building: Building = buildingOrError.getValue();

            // check if there's already a floor with the same number in the building
            const floorWithSameNumber = await this.floorRepo.getFloorByBuildingAndNumber(
                floorDTO.building,
                floorDTO.number,
            );
            if (floorWithSameNumber) {
                return Result.fail<IFloorDTO>('Floor with same number already exists in this building');
            }

            const information = await FloorInformation.create(floorDTO.information);
            if (information.isFailure) {
                return Result.fail<IFloorDTO>(information.errorValue());
            }

            const floorOrError = await Floor.create({
                number: floorDTO.number,
                information: information.getValue(),
                building: new BuildingId(building.buildingId.toString()),
            });

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult);

            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found');
            }

            // check if there's already a floor with the same number in the building
            const floorWithSameNumber = await this.floorRepo.getFloorByBuildingAndNumber(
                floorDTO.building,
                floorDTO.number,
                floorDTO.id,
            );
            if (floorWithSameNumber) {
                return Result.fail<IFloorDTO>('Floor with same number already exists in this building');
            }

            const information = await FloorInformation.create(floorDTO.information);
            if (information.isFailure) {
                return Result.fail<IFloorDTO>(information.errorValue());
            }

            // check if building exists
            const buildingOrError = await this.getBuilding(floorDTO.building);
            if (buildingOrError.isFailure) {
                return Result.fail<IFloorDTO>(buildingOrError.errorValue());
            }
            let building: Building = buildingOrError.getValue();

            floor.number = floorDTO.number;
            floor.information = information.getValue();
            floor.building = building.buildingId;

            await this.floorRepo.save(floor);

            const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;

            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getFloors(): Promise<Result<Array<IFloorWithBuildingDTO>>> {
        try {
            const floors = await this.floorRepo.getFloors();

            if (floors === null) {
                return Result.fail<Array<IFloorWithBuildingDTO>>('Floors not found');
            } else {
                // Collect building IDs from the floors
                const buildingIds = floors.map(floor => floor.building.toString());

                // Use buildingRepo to fetch all buildings
                const buildings = await this.buildingRepo.findByDomainIds(buildingIds);

                // Create a mapping of buildingId to building data
                const buildingMap = new Map<string, Building>();
                buildings.forEach(building => buildingMap.set(building.id.toString(), building));

                // Map floors to DTOs with building information
                const floorsDTOResult = floors.map(floor => {
                    const building = buildingMap.get(floor.building.toString());
                    return FloorMap.toDTOWtiBuilding(floor, building) as IFloorWithBuildingDTO;
                });

                return Result.ok<Array<IFloorWithBuildingDTO>>(floorsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getFloorById(floorId: string): Promise<Result<IFloorWithBuildingDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);
            const building = (await this.getBuilding(floor.building.toString())).getValue();

            if (floor === null) {
                return Result.fail<IFloorWithBuildingDTO>('Floor not found');
            } else {
                const floorDTOResult = FloorMap.toDTOWtiBuilding(floor, building) as IFloorWithBuildingDTO;
                return Result.ok<IFloorWithBuildingDTO>(floorDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.getFloorsByBuildingId(buildingId);

            if (floors === null) {
                return Result.fail<IFloorDTO[]>('Floors not found');
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

    public async getFloorsWithPassages(): Promise<Result<Array<IFloorDTO>>> {
        try {
            const floors = await this.floorRepo.getFloorsWithPassages();

            if (floors === null) {
                return Result.fail<Array<IFloorDTO>>('Floors not found');
            } else {
                const floorsDTOResult = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
                return Result.ok<Array<IFloorDTO>>(floorsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async deleteFloor(floorId: string): Promise<Result<void>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<void>('Floor not found');
            } else {
                const floors = await this.floorRepo.deleteFloor(floorId);
                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }
}
