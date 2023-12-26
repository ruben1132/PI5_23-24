import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/room";
import { RoomId } from "../../domain/valueObj/roomId";

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findByDomainId (roomId: RoomId | string): Promise<Room>;
  findByName (roomName: string): Promise<Room>;

  getRooms (): Promise<Room[]>;
  deleteRoom(roomId: RoomId | string): Promise<boolean>;

  findByIds (roomsIds: RoomId[] | string[]): Promise<Room[]>;
  getRoomById (roomId: string): Promise<Room>;
  //saveCollection (rooms: Room[]): Promise<Room[]>;
  //removeByRoomIds (rooms: RoomId[]): Promise<any>
}
