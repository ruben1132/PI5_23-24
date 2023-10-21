import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoomDTO from '../dto/IRoomDTO';
import { Room } from "../domain/room";
import IRoomRepo from './IRepos/IRoomRepo';
import IRoomService from './IServices/IRoomService';
import { Result } from "../core/logic/Result";
import { RoomMap } from "../mappers/RoomMap";
import IFloorRepo from './IRepos/IFloorRepo';
import { Floor } from '../domain/floor';
import { RoomNumber } from '../domain/valueObj/roomNumber';

@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
    ) { }


    public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        try {

            // check if floor exists
            let floor: Floor;
            const floorOrError = await this.getFloor(roomDTO.floor);
            if (floorOrError.isFailure) {
                return Result.fail<IRoomDTO>(floorOrError.errorValue());
            } else {
                floor = floorOrError.getValue();
            }
            
            const roomNum = await RoomNumber.create(roomDTO.number);
            if (roomNum.isFailure) {
                return Result.fail<IRoomDTO>(roomNum.errorValue());
            }

            const roomOrError = await Room.create({
                number: roomNum.getValue(),
                floor: floor,
            });

            if (roomOrError.isFailure) {
                return Result.fail<IRoomDTO>(roomOrError.errorValue());
            }

            const roomResult = roomOrError.getValue();
            
            await this.roomRepo.save(roomResult);

            const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
            return Result.ok<IRoomDTO>(roomDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async getRooms(): Promise<Result<Array<IRoomDTO>>> {
        try {
            const rooms = await this.roomRepo.getRooms();

            if (rooms === null) {
                return Result.fail<Array<IRoomDTO>>("Rooms not found");
            }
            else {
                const roomsDTOResult = rooms.map(room => RoomMap.toDTO(room) as IRoomDTO);
                return Result.ok<Array<IRoomDTO>>(roomsDTOResult)
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

    public async deleteRoom(id: string): Promise<Result<void>> {
        try {

            const room = await this.roomRepo.findByDomainId(id);

            if (room === null) {
                return Result.fail<void>("Room not found");
            }
            else {
                const rooms = await this.roomRepo.deleteRoom(id);

                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }

}
