import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from "../domain/building";
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";
import { BuildingCode } from '../domain/valueObj/buildingCode';
import { BuildingName } from '../domain/valueObj/buildingName';
import { BuildingDimensions } from '../domain/valueObj/buildingDimensions';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }

    public async getBuildings(): Promise<Result<Array<IBuildingDTO>>> {
        try {
            const buildings = await this.buildingRepo.getBuildings();

            if (buildings === null) {
                return Result.fail<Array<IBuildingDTO>>("Buildings not found");
            }
            else {
                
                const buildingsDTOResult = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);
                return Result.ok<Array<IBuildingDTO>>(buildingsDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getBuildingById(buildingId: string): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);

            if (building === null) {
                return Result.fail<IBuildingDTO>("Building not found");
            }
            else {
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return Result.ok<IBuildingDTO>(buildingDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {

            const buildingDM = BuildingMap.toDomain(buildingDTO);

            const buildingOrError = await Building.create(
                {
                    code: buildingDM.code,
                    name: buildingDM.name,
                    dimensions: buildingDM.dimensions,
                }
            );

            if (buildingOrError.isFailure) {
                return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
            }

            const buildingResult = buildingOrError.getValue();

            const test = await this.buildingRepo.save(buildingResult);

            const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
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
    }

    public async getBuildingsByFloorRange(min: number, max: number): Promise<Result<IBuildingDTO[]>> {
        try {
            const buildings = await this.floorRepo.getBuildingsByFloorRange(min, max);
            // const floors = await this.floorRe
            const buildingDTOs = buildings.map(building => BuildingMap.toDTO(building));
            return Result.ok<IBuildingDTO[]>(buildingDTOs);
        } catch (err) {
            throw err;
        }
    }

    public async deleteBuilding(buildingId: string): Promise<Result<void>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);

            if (building === null) {
                return Result.fail<void>("Building not found");
            }

            await this.buildingRepo.deleteBuilding(buildingId);

            return Result.ok<void>();

        } catch (e) {
            throw e;
        }
    };

}
