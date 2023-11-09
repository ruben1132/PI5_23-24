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
import { FloorMapElevator } from '../domain/valueObj/floorMapElevator';
import { FloorMapDoor } from '../domain/valueObj/floorMapDoor';
import { FloorMapRoom } from '../domain/valueObj/floorMapRoom';
import { FloorMapPosition } from '../domain/valueObj/floorMapPosition';
import { FloorMapDimensions } from '../domain/valueObj/floorMapDimensions';
import { FloorMapDirection } from '../domain/valueObj/floorMapDirection';
import { FloorMapPassage } from '../domain/valueObj/floorMapPassage';

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
                return Result.fail<IFloorMapDTO>(floorOrError.errorValue());
            }
            floor = floorOrError.getValue();


            // // check if rooms exists
            let rooms: Room[];
            const roomsOrError = await this.getRooms(floorMapDTO.fmRooms.map(fmRoom => fmRoom.roomId)
            );
            if (roomsOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(roomsOrError.errorValue());
            }

            // check if it found all the rooms
            if (roomsOrError.getValue().length !== floorMapDTO.fmRooms.length) {
                return Result.fail<IFloorMapDTO>("Couldn't find all the rooms by the given ids");
            }
            rooms = roomsOrError.getValue();

            // check if elevators exists
            let elevator: Elevator;
            const elevatorOrError = await this.getElevator(floorMapDTO.fmElevator.elevatorId);
            if (elevatorOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(elevatorOrError.errorValue());
            }
            elevator = elevatorOrError.getValue();

            // check if passages exists
            let passages: Passage[];
            const passagesOrError = await this.getPassages(floorMapDTO.fmPassages.map(fmPassage => fmPassage.passageId)
            );
            if (passagesOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(passagesOrError.errorValue());
            }

            // check if it found all the passages
            if (passagesOrError.getValue().length !== floorMapDTO.fmPassages.length) {
                return Result.fail<IFloorMapDTO>("Couldn't find all the passages by the given ids");
            }
            passages = passagesOrError.getValue();

            // create fmRooms
            const fmRooms = floorMapDTO.fmRooms.map(fmRoom => {
                const room = rooms.find(room => room.id.toString() === fmRoom.roomId);
                const dimensions = FloorMapDimensions.create({ startX: fmRoom.startX, startY: fmRoom.startY, endX: fmRoom.endX, endY: fmRoom.endY }).getValue();

                return FloorMapRoom.create({ room: room.domainId, dimensions: dimensions }).getValue();
            });

            // check if created all the fmRooms
            if (fmRooms.length !== floorMapDTO.fmRooms.length) {
                return Result.fail<IFloorMapDTO>("There was an error creating the fmRooms");
            }

            // create fmDoors
            const fmDoors = floorMapDTO.fmDoors.map(fmDoor => {
                const position = FloorMapPosition.create({ posX: fmDoor.positionX, posY: fmDoor.positionY, direction: FloorMapDirection.create(fmDoor.direction).getValue() }).getValue();
                return FloorMapDoor.create({ position: position }).getValue();
            });

            // check if created all the fmDoors
            if (fmDoors.length !== floorMapDTO.fmDoors.length) {
                return Result.fail<IFloorMapDTO>("There was an error creating the fmDoors");
            }

            // create fmElevator
            const fmElevatorOrError = await FloorMapElevator.create({
                elevator: elevator.domainId,
                position: FloorMapPosition.create({
                    posX: floorMapDTO.fmElevator.positionX,
                    posY: floorMapDTO.fmElevator.positionY,
                    direction: FloorMapDirection.create(floorMapDTO.fmElevator.direction).getValue()
                }).getValue()
            });

            if (fmElevatorOrError.isFailure) {
                return Result.fail<IFloorMapDTO>(fmElevatorOrError.errorValue());
            }

            // create fmPassages
            const fmPassages = floorMapDTO.fmPassages.map(fmPassage => {
                const passage = passages.find(passage => passage.id.toString() === fmPassage.passageId);
                const position = FloorMapPosition.create({ posX: fmPassage.positionX, posY: fmPassage.positionY, direction: FloorMapDirection.create(fmPassage.direction).getValue() }).getValue();
                return FloorMapPassage.create({  passage: passage.domainId, position: position }).getValue();
            });

            // check if created all the fmPassages
            if (fmPassages.length !== floorMapDTO.fmPassages.length) {
                return Result.fail<IFloorMapDTO>("There was an error creating the fmPassages");
            }

            const floorMapOrError = await FloorMap.create({
                floor: floor.domainId,
                map: floorMapDTO.map,
                fmRooms: fmRooms,
                fmElevator: fmElevatorOrError.getValue(),
                fmPassages: fmPassages,
                fmDoors: fmDoors,
                wallTexture: floorMapDTO.wallTexture,
                groundTexture: floorMapDTO.groundTexture,
                doorTexture: floorMapDTO.doorTexture,
                elevatorTexture: floorMapDTO.elevatorTexture
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
            const floorMap = await this.floorMapRepo.getFloorMapByFloorId(floorId);

            if (floorMap === null) {
                return Result.fail<IFloorMapDTO>("FloorMap not found for the given floor");
            } else {
                const floorMapsDTOResult = FloorMapMap.toDTO(floorMap) as IFloorMapDTO;
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


