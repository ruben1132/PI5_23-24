import { Service, Inject } from 'typedi';
import config from "../../config";
import IPassageDTO from '../dto/IPassageDTO';
import { Passage } from "../domain/passage";
import IPassageRepo from './IRepos/IPassageRepo';
import IPassageService from './IServices/IPassageService';
import { Result } from "../core/logic/Result";
import { PassageMap } from "../mappers/PassageMap";

@Service()
export default class PassageService implements IPassageService {
    constructor(
        @Inject(config.repos.passage.name) private passageRepo: IPassageRepo
    ) { }


    public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
        try {

            const passageOrError = await Passage.create(passageDTO);

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

}
