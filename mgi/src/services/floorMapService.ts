import { Service, Inject } from 'typedi';
import config from '../../config';
import { IFloorMapDTO, IFloorMapWithFileDTO } from '../dto/IFloorMapDTO';
import { FloorMap } from '../domain/floorMap';
import IFloorMapRepo from './IRepos/IFloorMapRepo';
import IFloorMapService from './IServices/IFloorMapService';
import { Result } from '../core/logic/Result';
import { FloorMapMap } from '../mappers/FloorMapMap';
import IFloorRepo from './IRepos/IFloorRepo';
import IPassageRepo from './IRepos/IPassageRepo';
import { Floor } from '../domain/floor';
import { Room } from '../domain/room';
import { Elevator } from '../domain/elevator';
import { Passage } from '../domain/passage';
import IRoomRepo from './IRepos/IRoomRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';
import * as fs from 'fs';
import * as path from 'path';

@Service()
export default class FloorMapService implements IFloorMapService {
    constructor(
        @Inject(config.repos.floorMap.name) private floorMapRepo: IFloorMapRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
        @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
        @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    ) {}

    public async createFloorMap(floorMapDTO: IFloorMapDTO): Promise<Result<IFloorMapWithFileDTO>> {
        try {
            // check if floor exists
            let floor: Floor;
            const floorOrError = await this.getFloor(floorMapDTO.floor);
            if (floorOrError.isFailure) {
                return Result.fail<IFloorMapWithFileDTO>(floorOrError.errorValue());
            }
            floor = floorOrError.getValue();

            // // check if rooms exists
            const roomsOrError = await this.getRooms(floorMapDTO.fmRooms.map(fmRoom => fmRoom.roomId));
            if (roomsOrError.isFailure) {
                return Result.fail<IFloorMapWithFileDTO>(roomsOrError.errorValue());
            }

            // check if it found all the rooms
            if (roomsOrError.getValue().length !== floorMapDTO.fmRooms.length) {
                return Result.fail<IFloorMapWithFileDTO>("Couldn't find all the rooms by the given ids");
            }

            // check if elevators exists
            const elevatorOrError = await this.getElevator(floorMapDTO.fmElevator.elevatorId);
            if (elevatorOrError.isFailure) {
                return Result.fail<IFloorMapWithFileDTO>(elevatorOrError.errorValue());
            }

            // check if passages exists (optional)
            if (floorMapDTO.fmPassages) {
                const passagesOrError = await this.getPassages(
                    floorMapDTO.fmPassages?.map(fmPassage => fmPassage.passageId),
                );
                if (passagesOrError.isFailure) {
                    return Result.fail<IFloorMapWithFileDTO>(passagesOrError.errorValue());
                }

                // check if it found all the passages
                if (passagesOrError.getValue().length !== floorMapDTO.fmPassages.length) {
                    return Result.fail<IFloorMapWithFileDTO>("Couldn't find all the passages by the given ids");
                }
            }

            // save file
            const fileName = floorMapDTO.floor + '.json';
            const filePath = path.join(__dirname, '..', '..', '..', 'spa', 'public', 'v3d', 'mazes', fileName);
            fs.writeFileSync(filePath, JSON.stringify(floorMapDTO));

            const floorMap = await FloorMapMap.toDomain({ floor: floorMapDTO.floor, file: fileName });

            const floorMapSaved = await this.floorMapRepo.save(floorMap);

            const floorMapDTOResult = FloorMapMap.toDTO(floorMapSaved) as IFloorMapWithFileDTO;
            return Result.ok<IFloorMapWithFileDTO>(floorMapDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getFloorMaps(): Promise<Result<Array<IFloorMapWithFileDTO>>> {
        try {
            const floorMaps = await this.floorMapRepo.getFloorMaps();

            if (floorMaps === null) {
                return Result.fail<Array<IFloorMapWithFileDTO>>('FloorMaps not found');
            } else {
                const floorMapsDTOResult = floorMaps.map(
                    floorMap => FloorMapMap.toDTO(floorMap) as IFloorMapWithFileDTO,
                );
                return Result.ok<Array<IFloorMapWithFileDTO>>(floorMapsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getFloorMapByFloorId(floorId: string): Promise<Result<IFloorMapWithFileDTO>> {
        try {
            const floorMap = await this.floorMapRepo.getFloorMapByFloorId(floorId);

            if (floorMap === null) {
                return Result.fail<IFloorMapWithFileDTO>('FloorMap not found for the given floor');
            } else {
                const floorMapsDTOResult = FloorMapMap.toDTO(floorMap) as IFloorMapWithFileDTO;
                return Result.ok<IFloorMapWithFileDTO>(floorMapsDTOResult);
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

    // check if rooms exists
    private async getRooms(roomsId: string[]): Promise<Result<Room[]>> {
        const rooms = await this.roomRepo.findByIds(roomsId);
        const found = !!rooms;

        if (found) {
            return Result.ok<Room[]>(rooms);
        } else {
            return Result.fail<Room[]>("Couldn't find rooms by one of the given ids=" + roomsId);
        }
    }

    // check if elevator exists
    private async getElevator(elevatorId: string): Promise<Result<Elevator>> {
        const elevator = await this.elevatorRepo.findByDomainId(elevatorId);
        const found = !!elevator;

        if (found) {
            return Result.ok<Elevator>(elevator);
        } else {
            return Result.fail<Elevator>("Couldn't find elevator by id=" + elevatorId);
        }
    }

    // check if passages exists
    private async getPassages(passagesId: string[]): Promise<Result<Passage[]>> {
        const passages = await this.passageRepo.findByIds(passagesId);
        const found = !!passages;

        if (found) {
            return Result.ok<Passage[]>(passages);
        } else {
            return Result.fail<Passage[]>("Couldn't find passages by one of the given ids=" + passagesId);
        }
    }
}
