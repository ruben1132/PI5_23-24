import { Service, Inject } from 'typedi';
import config from "../../config";
import IPassageDTO from '../dto/IPassageDTO';
import { Passage } from "../domain/passage";
import IPassageRepo from './IRepos/IPassageRepo';
import IPassageService from './IServices/IPassageService';
import { Result } from "../core/logic/Result";
import { PassageMap } from "../mappers/PassageMap";
import IFloorRepo from './IRepos/IFloorRepo';
import { Floor } from '../domain/floor';

@Service()
export default class PassageService implements IPassageService {
    constructor(
        @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }


    public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
        try {

            // check if floor exists
            let fromFloor: Floor;
            const fromFloorOrError = await this.getFloor(passageDTO.fromFloor);
            if (fromFloorOrError.isFailure) {
                return Result.fail<IPassageDTO>(fromFloorOrError.error);
            } else {
                fromFloor = fromFloorOrError.getValue();
            }

            let toFloor: Floor;
            const toOrError = await this.getFloor(passageDTO.toFloor);
            if (toOrError.isFailure) {
                return Result.fail<IPassageDTO>(toOrError.error);
            } else {
                toFloor = toOrError.getValue();
            }

            const passageOrError = await Passage.create({
                fromFloor: fromFloor,
                toFloor: toFloor,
                designation: passageDTO.designation
            });

            if (passageOrError.isFailure) {
                return Result.fail<IPassageDTO>(passageOrError.errorValue());
            }

            const passageResult = passageOrError.getValue();

            await this.passageRepo.save(passageResult);

            const passageDTOResult = PassageMap.toDTO(passageResult) as IPassageDTO;
            return Result.ok<IPassageDTO>(passageDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async getPassages(): Promise<Result<Array<IPassageDTO>>> {
        try {
            const passages = await this.passageRepo.getPassages();

            if (passages === null) {
                return Result.fail<Array<IPassageDTO>>("Passages not found");
            }
            else {
                const passagesDTOResult = passages.map(passage => PassageMap.toDTO(passage) as IPassageDTO);
                return Result.ok<Array<IPassageDTO>>(passagesDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

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

    public async deletePassage(id: string): Promise<Result<void>> {
        try {

            const role = await this.passageRepo.findByDomainId(id);

            if (role === null) {
                return Result.fail<void>("Role not found");
            }
            else {
                const passages = await this.passageRepo.deletePassage(id);

                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }

}
