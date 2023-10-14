import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorMapDTO from '../dto/IFloorMapDTO';
import { FloorMap } from "../domain/floorMap";
import IFloorMapRepo from './IRepos/IFloorMapRepo';
import IFloorMapService from './IServices/IFloorMapService';
import { Result } from "../core/logic/Result";
import { FloorMapMap } from "../mappers/FloorMapMap";
import IFloorRepo from './IRepos/IFloorRepo';
import IPassageRepo from './IRepos/IPassageRepo';
import { Floor } from '../domain/floor';
import { Room } from '../domain/room';
import { Elevator } from '../domain/elevator';
import { Passage } from '../domain/passage';
import IRoomRepo from './IRepos/IRoomRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';

@Service()
export default class FloorMapService implements IFloorMapService {
    constructor(
        @Inject(config.repos.floorMap.name) private floorMapRepo: IFloorMapRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
        @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
        @Inject(config.repos.passage.name) private passageRepo: IPassageRepo
    ) { }


    public async createFloorMap(floorMapDTO: IFloorMapDTO): Promise<Result<IFloorMapDTO>> {
        try {

            // check if floor exists
            let floor: Floor;
            const floorOrError = await this.getFloor(floorMapDTO.floor);
            if (floorOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(floorOrError.error);
            }
            floor = floorOrError.getValue();


            // // check if rooms exists
            let rooms: Room[];
            const roomsOrError = await this.getRooms(floorMapDTO.fmRooms.map(fmRoom => fmRoom.roomId)
            );
            if (roomsOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(roomsOrError.error);
            }
            rooms = roomsOrError.getValue();

            // check if elevators exists
            let elevator: Elevator;
            const elevatorOrError = await this.getElevator(floorMapDTO.fmElevator.elevatorId);
            if (elevatorOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(elevatorOrError.error);
            }
            elevator = elevatorOrError.getValue();

            // check if passages exists
            let passages: Passage[];
            const passagesOrError = await this.getPassages(floorMapDTO.fmPassages.map(fmPassage => fmPassage.passageId)
            );
            if (passagesOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(passagesOrError.error);
            }
            passages = passagesOrError.getValue();

            const fmDomain = FloorMapMap.toDomain(floorMapDTO);

            // create floorMap
            const floorMapOrError = await FloorMap.create({
                floor: floor,
                map: fmDomain.map,
                fmRooms: fmDomain.fmRooms,
                fmElevator: fmDomain.fmElevator,
                fmPassages: fmDomain.fmPassages,
                fmDoors: fmDomain.fmDoors
            });

            if (floorMapOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(floorMapOrError.errorValue());
            }

            const floorMapResult = floorMapOrError.getValue();

            await this.floorMapRepo.save(floorMapResult);

            const floorMapDTOResult = FloorMapMap.toDTO(floorMapResult) as IFloorMapDTO;
            return Result.ok<IFloorMapDTO>(floorMapDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async getFloorMaps(): Promise<Result<Array<IFloorMapDTO>>> {
        try {
            const floorMaps = await this.floorMapRepo.getFloorMaps();

            if (floorMaps === null) {
                return Result.fail<Array<IFloorMapDTO>>("FloorMaps not found");
            }
            else {
                const floorMapsDTOResult = floorMaps.map(floorMap => FloorMapMap.toDTO(floorMap) as IFloorMapDTO);
                return Result.ok<Array<IFloorMapDTO>>(floorMapsDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getFloorMapByFloorId(floorId: string): Promise<Result<IFloorMapDTO>> {
        try {
            const floorMaps = await this.floorMapRepo.getFloorMapByFloorId(floorId);

            if (floorMaps === null) {
                return Result.fail<IFloorMapDTO>("FloorMaps not found");
            } else {
                const floorMapsDTOResult = FloorMapMap.toDTO(floorMaps) as IFloorMapDTO;
                return Result.ok<IFloorMapDTO>(floorMapsDTOResult);
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
            return Result.fail<Floor>("Couldn't find building by id=" + floorId);
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


