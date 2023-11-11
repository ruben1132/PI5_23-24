import { Service, Inject } from 'typedi';
import config from '../../config';
import { IPassageDTO, IPassageWithFloorDTO } from '../dto/IPassageDTO';
import { Passage } from '../domain/passage';
import IPassageRepo from './IRepos/IPassageRepo';
import IPassageService from './IServices/IPassageService';
import { Result } from '../core/logic/Result';
import { PassageMap } from '../mappers/PassageMap';
import IFloorRepo from './IRepos/IFloorRepo';
import { Floor } from '../domain/floor';

@Service()
export default class PassageService implements IPassageService {
    constructor(
        @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    ) {}

    public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
        try {
            // check if floor exists
            let fromFloor: Floor;
            const fromFloorOrError = await this.getFloor(passageDTO.fromFloor);
            if (fromFloorOrError.isFailure) {
                return Result.fail<IPassageDTO>(fromFloorOrError.errorValue());
            } else {
                fromFloor = fromFloorOrError.getValue();
            }

            let toFloor: Floor;
            const toOrError = await this.getFloor(passageDTO.toFloor);
            if (toOrError.isFailure) {
                return Result.fail<IPassageDTO>(toOrError.errorValue());
            } else {
                toFloor = toOrError.getValue();
            }

            const passageOrError = await Passage.create({
                fromFloor: fromFloor.domainId,
                toFloor: toFloor.domainId,
                designation: passageDTO.designation,
            });

            if (passageOrError.isFailure) {
                return Result.fail<IPassageDTO>(passageOrError.errorValue());
            }

            const passageResult = passageOrError.getValue();

            await this.passageRepo.save(passageResult);

            const passageDTOResult = PassageMap.toDTO(passageResult) as IPassageDTO;
            return Result.ok<IPassageDTO>(passageDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getPassages(): Promise<Result<Array<IPassageWithFloorDTO>>> {
        try {
            const passages = await this.passageRepo.getPassages();

            const passagesDTO: IPassageWithFloorDTO[] = [];

            for (const passage of passages) {
                const fromFloor = await this.floorRepo.findByDomainId(passage.fromFloor);
                const toFloor = await this.floorRepo.findByDomainId(passage.toFloor);

                if (fromFloor === null || toFloor === null) {
                    return Result.fail<Array<IPassageWithFloorDTO>>('Passage not found');
                }

                const passageDTOResult = PassageMap.toDTOWithFloor(passage, fromFloor, toFloor) as IPassageWithFloorDTO;


                passagesDTO.push(passageDTOResult);
            }

            if (passages === null) {
                return Result.fail<Array<IPassageWithFloorDTO>>('Passages not found');
            } else {
                return Result.ok<Array<IPassageWithFloorDTO>>(passagesDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getPassageById(id: string): Promise<Result<IPassageWithFloorDTO>> {
        try {
            const passage = await this.passageRepo.findByDomainId(id);

            const passageFromFloor = await this.floorRepo.findByDomainId(passage.fromFloor);
            const passageToFloor = await this.floorRepo.findByDomainId(passage.toFloor);

            if (passageFromFloor === null || passageToFloor === null) {
                return Result.fail<IPassageWithFloorDTO>('Passage not found');
            }

            if (passage === null) {
                return Result.fail<IPassageWithFloorDTO>('Passage not found');
            } else {
                const passageDTOResult = PassageMap.toDTOWithFloor(
                    passage,
                    passageFromFloor,
                    passageToFloor,
                ) as IPassageWithFloorDTO;
                return Result.ok<IPassageWithFloorDTO>(passageDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getPassagesBetweenBuildings(first: string, second: string): Promise<Result<Array<IPassageDTO>>> {
        try {
            const passages = await this.passageRepo.getPassagesBetweenBuildings(first, second);

            if (passages === null) {
                return Result.fail<Array<IPassageDTO>>('Passages not found');
            } else {
                const passagesDTOResult = passages.map(passage => PassageMap.toDTO(passage) as IPassageDTO);
                return Result.ok<Array<IPassageDTO>>(passagesDTOResult);
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

    public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
        try {
            const passage = await this.passageRepo.findByDomainId(passageDTO.id);

            if (passage === null) {
                return Result.fail<IPassageDTO>('Passage not found');
            }

            // check if floor exists
            let fromFloor: Floor;
            const fromFloorOrError = await this.getFloor(passageDTO.fromFloor);
            if (fromFloorOrError.isFailure) {
                return Result.fail<IPassageDTO>(fromFloorOrError.errorValue());
            } else {
                fromFloor = fromFloorOrError.getValue();
            }

            let toFloor: Floor;
            const toOrError = await this.getFloor(passageDTO.toFloor);
            if (toOrError.isFailure) {
                return Result.fail<IPassageDTO>(toOrError.errorValue());
            } else {
                toFloor = toOrError.getValue();
            }

            passage.toFloor = toFloor.domainId;
            passage.toFloor = toFloor.domainId;
            passage.designation = passageDTO.designation;

            await this.passageRepo.save(passage);

            const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;

            return Result.ok<IPassageDTO>(passageDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async deletePassage(id: string): Promise<Result<void>> {
        try {
            const role = await this.passageRepo.findByDomainId(id);

            if (role === null) {
                return Result.fail<void>('Role not found');
            } else {
                const passages = await this.passageRepo.deletePassage(id);

                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }
}
