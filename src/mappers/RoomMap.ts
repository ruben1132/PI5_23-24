import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomDTO from "../dto/IRoomDTO";
import { Room } from "../domain/room";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {

    public static toDTO(room: Room): IRoomDTO {
        
        return {
            domainId: room.id.toString(),
            number: room.number.toString(),
            floor: room.floor.domainId.toString(),
        } as IRoomDTO;
    }

    public static toDomain(room: any | Model<IRoomPersistence & Document>): Room {
        const roomOrError = Room.create(
            room,
            new UniqueEntityID(room.domainId)
        );

        roomOrError.isFailure ? console.log(roomOrError.error) : '';

        return roomOrError.isSuccess ? roomOrError.getValue() : null;
    }

    public static toPersistence(room: Room): any {

        return {
            domainId: room.id.toString(),
            number: room.number.toString(),
            floor: room.floor.id.toString(),
        }
    }
}