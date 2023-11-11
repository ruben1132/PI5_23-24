import { Service, Inject } from 'typedi';

import IRoomRepo from '../services/IRepos/IRoomRepo';
import { Room } from '../domain/room';
import { RoomId } from '../domain/valueObj/roomId';
import { RoomMap } from '../mappers/RoomMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

@Service()
export default class RoomRepo implements IRoomRepo {
    private models: any;

    constructor(@Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(room: Room): Promise<boolean> {
        const idX = room.domainId instanceof RoomId ? (<RoomId>room.domainId).toValue() : room.domainId;

        const query = { domainId: idX };
        const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

        return !!roomDocument === true;
    }

    public async save(room: Room): Promise<Room> {
        const query = { domainId: room.domainId.toString() };

        const roomDocument = await this.roomSchema.findOne(query);

        try {
            if (roomDocument === null) {
                const rawRoom: any = RoomMap.toPersistence(room);

                const roomCreated = await this.roomSchema.create(rawRoom);

                return RoomMap.toDomain(roomCreated);
            } else {
                roomDocument.number = room.number.value;
                roomDocument.floor = room.floor.toString();
                await roomDocument.save();

                return room;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(roomId: RoomId | string): Promise<Room> {
        const room = await this.roomSchema.findOne({ domainId: roomId });

        if (room != null) {
            return RoomMap.toDomain(room);
        }

        return null;
    }

    public async findByIds(roomIds: RoomId[] | string[]): Promise<Room[]> {
        const rooms = await this.roomSchema.find({ domainId: { $in: roomIds } });

        if (rooms != null && rooms.length > 0) {
            return rooms.map(room => RoomMap.toDomain(room));
        }

        return null;
    }

    public async getRooms(): Promise<Room[]> {
        const rooms = await this.roomSchema.find({});

        if (rooms != null) {
            return rooms.map(room => RoomMap.toDomain(room));
        } else return null;
    }

    public async getRoomById(roomId: string): Promise<Room> {
        try {
            const query = { domainId: roomId };
            const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

            if (roomRecord != null) {
                return RoomMap.toDomain(roomRecord);
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    public async deleteRoom(roomId: RoomId | string): Promise<boolean> {
        const query = { domainId: roomId };
        const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

        if (roomRecord != null) {
            await roomRecord.remove();
            return true;
        } else return null;
    }
}
