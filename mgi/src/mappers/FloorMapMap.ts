import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IFloorMapPersistence } from '../dataschema/IFloorMapPersistence';

import IFloorMapDTO from '../dto/IFloorMapDTO';
import { FloorMap } from '../domain/floorMap';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMapRoom } from '../domain/valueObj/floorMapRoom';
import { FloorMapDimensions } from '../domain/valueObj/floorMapDimensions';
import { FloorMapPosition } from '../domain/valueObj/floorMapPosition';
import { FloorMapDirection } from '../domain/valueObj/floorMapDirection';
import { FloorMapElevator } from '../domain/valueObj/floorMapElevator';

export class FloorMapMap extends Mapper<FloorMap> {
    public static toDTO(floorMap: FloorMap): IFloorMapDTO {
        const restOfProps = this.mapObjs(floorMap);

        return {
            floor: floorMap.floor.toString(),
            map: floorMap.map,
            ...restOfProps,
            wallTexture: floorMap.wallTexture,
            groundTexture: floorMap.groundTexture,
            doorTexture: floorMap.doorTexture,
            elevatorTexture: floorMap.elevatorTexture,
        } as IFloorMapDTO;
    }

    public static toDomain(floorMap: any | Model<IFloorMapPersistence & Document>): FloorMap {
        const floorMapOrError = FloorMap.create(
            {
                floor: floorMap.floor,
                map: floorMap.map,
                fmRooms: floorMap.fmRooms.map(x => {
                    return FloorMapRoom.create({
                        room: x.roomId,
                        dimensions: FloorMapDimensions.create({
                            startX: x.startX,
                            startY: x.startY,
                            endX: x.endX,
                            endY: x.endY,
                        }).getValue(),
                    }).getValue();
                }),
                fmDoors: floorMap.fmDoors.map(x => {
                    return {
                        position: FloorMapPosition.create({
                            posX: x.positionX,
                            posY: x.positionY,
                            direction: FloorMapDirection.create(x.direction).getValue(),
                        }).getValue(),
                    };
                }),
                fmElevator: FloorMapElevator.create({
                    elevator: floorMap.fmElevator.elevatorId,
                    position: FloorMapPosition.create({
                        posX: floorMap.fmElevator.positionX,
                        posY: floorMap.fmElevator.positionY,
                        direction: FloorMapDirection.create(floorMap.fmElevator.direction).getValue(),
                    }).getValue(),
                }).getValue(),
                fmPassages: floorMap.fmPassages.map(x => {
                    return {
                        passage: x.passageId,
                        position: FloorMapPosition.create({
                            posX: x.positionX,
                            posY: x.positionY,
                            direction: FloorMapDirection.create(x.direction).getValue(),
                        }).getValue(),
                    };
                }),
                wallTexture: floorMap.wallTexture,
                groundTexture: floorMap.groundTexture,
                doorTexture: floorMap.doorTexture,
                elevatorTexture: floorMap.elevatorTexture,
            },
            new UniqueEntityID(floorMap.domainId),
        );

        floorMapOrError.isFailure ? console.log(floorMapOrError.error) : '';

        return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
    }

    public static toPersistence(fm: FloorMap): any {
        const restOfProps = this.mapObjs(fm);

        return {
            domainId: fm.id.toString(),
            floor: fm.floor.toString(),
            map: fm.map,
            ...restOfProps,
            wallTexture: fm.wallTexture,
            groundTexture: fm.groundTexture,
            doorTexture: fm.doorTexture,
            elevatorTexture: fm.elevatorTexture,
        };
    }

    private static mapObjs(fm: FloorMap): any {
        console.log(fm.fmRooms);
        console.log(fm.fmDoors);
        console.log(fm.fmElevator);
        console.log(fm.fmPassages);

        return {
            fmRooms: fm.fmRooms.map(fR => {
                return {
                    roomId: fR.room.toString(),
                    startX: fR.dimensions.startX,
                    startY: fR.dimensions.startY,
                    endX: fR.dimensions.endX,
                    endY: fR.dimensions.endY,
                };
            }),
            fmDoors: fm.fmDoors.map(fD => {
                return {
                    positionX: fD.position.posX,
                    positionY: fD.position.posY,
                    direction: fD.position.direction.value,
                };
            }),
            fmElevator: {
                elevatorId: fm. fmElevator.elevator.toString(),
                positionX: fm.fmElevator.position.posX,
                positionY: fm.fmElevator.position.posY,
                direction: fm.fmElevator.position.direction.value,
            },
            fmPassages: fm.fmPassages.map(x => {
                return {
                    passageId: x.passage.toString(),
                    positionX: x.position.posX,
                    positionY: x.position.posY,
                    direction: x.position.direction.value,
                };
            }),
        };
    }
}
