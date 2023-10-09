import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from "../domain/building";
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
    ) { }

    public async getBuildings(): Promise<Result<Array<IBuildingDTO>>> {
        try {
          const roles = await this.buildingRepo.getBuildings();
    
          if (roles === null) {
            return Result.fail<Array<IBuildingDTO>>("Buildings not found");
          }
          else {
            const buildingsDTOResult = roles.map(building => BuildingMap.toDTO(building) as IBuildingDTO);        
            return Result.ok<Array<IBuildingDTO>>( buildingsDTOResult )
            }
        } catch (e) {
          throw e;
        }
      }

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {

            const buildingOrError = await Building.create(buildingDTO);

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

    //   public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    //     try {
    //       const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

    //       if (building === null) {
    //         return Result.fail<IBuildingDTO>("Building not found");
    //       }
    //       else {
    //         building.designation = buildingDTO.designation;
    //         await this.buildingRepo.save(building);

    //         const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
    //         return Result.ok<IBuildingDTO>( buildingDTOResult )
    //         }
    //     } catch (e) {
    //       throw e;
    //     }
    //   }

}
