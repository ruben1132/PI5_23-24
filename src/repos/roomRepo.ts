import { Service, Inject } from 'typedi';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Room } from "../domain/room";
import { RoomId } from "../domain/valueObj/roomId";
// import { RoomMap } from "../mappers/RoomMap"; // TODO: implementar

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(room: Room): Promise<boolean> {

    const idX = room.id instanceof RoomId ? (<RoomId>room.id).toValue() : room.id;

    const query = { domainId: idX };
    const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

    return !!roomDocument === true;
  }

    // TODO: so dei copy + paste de outro repo q ja tava feito - fazer as alteracoes necessarias
  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() };

    const roomDocument = await this.roomSchema.findOne(query);

    try {
      if (roomDocument === null) {
        // const rawRoom: any = RoomMap.toPersistence(room);

        // const roomCreated = await this.roomSchema.create(rawRoom);

        // return RoomMap.toDomain(roomCreated);
      } else {
        // roomDocument.name = room.name;
        await roomDocument.save();

        return room;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

    if (roomRecord != null) {
      // return RoomMap.toDomain(roomRecord);
    }
    else
      return null;
    }
    
    public async findByIds(roomsIds: RoomId[] | string[]): Promise<Room[]> {
        const query = { domainId: { $in: roomsIds } };
        const roomRecord = await this.roomSchema.find(query as FilterQuery<IRoomPersistence & Document>);

        if (roomRecord != null) {
            // return roomRecord.map((room) => RoomMap.toDomain(room));
        }

        return null;
    }

  public async getRooms(): Promise<Room[]> {
    const roomRecord = await this.roomSchema.find({});

    if (roomRecord != null) {
      // return roomRecord.map((room) => RoomMap.toDomain(room));
    }
    else
      return null;
  }

  public async getRoomById(roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

    if (roomRecord != null) {
      // return RoomMap.toDomain(roomRecord);
    }
    else
      return null;

  }

  public async deleteRoom(roomId: RoomId | string): Promise<boolean> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

    if (roomRecord != null) {
      await roomRecord.remove();
      return true;
    }
    else
      return null;
  }
}