import { Result } from "../../core/logic/Result";
import { IRoomDTO, IRoomWithFloorDTO } from "../../dto/IRoomDTO";

export default interface IRoomService {

  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getRooms (): Promise<Result<Array<IRoomWithFloorDTO>>>;
  deleteRoom(roomId: string): Promise<Result<void>>;

  getRoomById(roomId: string): Promise<Result<IRoomWithFloorDTO>>;
}
