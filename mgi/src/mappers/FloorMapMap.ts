import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IFloorMapPersistence } from '../dataschema/IFloorMapPersistence';

import { IFloorMapDTO } from '../dto/IFloorMapDTO';
import { FloorMap } from '../domain/floorMap';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMapElevator } from '../domain/valueObj/floorMapElevator';
import { FloorMapDoor } from '../domain/valueObj/floorMapDoor';
import { FloorMapRoom } from '../domain/valueObj/floorMapRoom';
import { FloorMapPosition } from '../domain/valueObj/floorMapPosition';
import { FloorMapDimensions } from '../domain/valueObj/floorMapDimensions';
import { FloorMapDirection } from '../domain/valueObj/floorMapDirection';
import { FloorMapPassage } from '../domain/valueObj/floorMapPassage';
import { FloorMapSurface } from '../domain/valueObj/floorMapSurface';
import { FloorMapSize } from '../domain/valueObj/floorMapSize';
import { FloorMapMaps } from '../domain/floorMapMaps';
import { FloorMapPlayer } from '../domain/floorMapPlayer';
import { FloorMapMaze } from '../domain/valueObj/floorMapMaze';
import { RoomId } from '../domain/valueObj/roomId';
import { ElevatorId } from '../domain/valueObj/elevatorId';
import { PassageId } from '../domain/valueObj/passageId';

export class FloorMapMap extends Mapper<FloorMap> {
    public static toDTO(floorMap: FloorMap): IFloorMapDTO {
        const restOfProps = this.mapObjs(floorMap);

        return {
            floor: floorMap.floor.toString(),
            maze: {
                size: floorMap.maze.size,
                map: floorMap.maze.map,
                exitLocation: floorMap.maze.exitLocation,
            },
            player: {
                initialPosition: floorMap.player.initialPosition,
                initialDirection: floorMap.player.initialDirection,
            },
            ...restOfProps,
        } as IFloorMapDTO;
    }

    public static toDomain(floorMap: any | Model<IFloorMapPersistence & Document>): FloorMap {
        // create fmRooms
        const fmRooms = floorMap.fmRooms.map(fmRoom => {
            const dimensions = FloorMapDimensions.create({
                startX: fmRoom.startX,
                startY: fmRoom.startY,
                endX: fmRoom.endX,
                endY: fmRoom.endY,
            }).getValue();

            return FloorMapRoom.create({ room: new RoomId(fmRoom.roomId), dimensions: dimensions }).getValue();
        });

        // create fmDoors
        const fmDoors = floorMap.fmDoors.map(fmDoor => {            
            const position = FloorMapPosition.create({
                posX: fmDoor.position.positionX,
                posY: fmDoor.position.positionY,
                direction: FloorMapDirection.create(fmDoor.position.direction).getValue(),
            }).getValue();
            return FloorMapDoor.create({ position: position }).getValue();
        });

        // create fmElevator
        const fmElevatorOrError = FloorMapElevator.create({
            elevator: new ElevatorId(floorMap.fmElevator.elevatorId),
            position: FloorMapPosition.create({
                posX: floorMap.fmElevator.position.positionX,
                posY: floorMap.fmElevator.position.positionY,
                direction: FloorMapDirection.create(floorMap.fmElevator.position.direction).getValue(),
            }).getValue(),
        });

        // create fmPassages
        const fmPassages = floorMap.fmPassages.map(fmPassage => {
            const position = FloorMapPosition.create({
                posX: fmPassage.position.positionX,
                posY: fmPassage.position.positionY,
                direction: FloorMapDirection.create(fmPassage.position.direction).getValue(),
            }).getValue();
            return FloorMapPassage.create({
                passage: new PassageId(fmPassage.passageId),
                position: position,
            }).getValue();
        });

        // create ground
        const groundOrError = FloorMapSurface.create({
            segments: FloorMapSize.create({
                width: floorMap.ground.segments.width,
                depth: floorMap.ground.segments.depth,
                height: floorMap.ground.segments.height,
            }).getValue(),
            primaryColor: floorMap.ground.primaryColor,
            maps: FloorMapMaps.create({
                color: floorMap.ground.maps.color,
                ao: floorMap.ground.maps.ao,
                displacement: floorMap.ground.maps.displacement,
                normal: {
                    url: floorMap.ground.maps.normal.url,
                    type: floorMap.ground.maps.normal.type,
                    scale: floorMap.ground.maps.normal.scale
                },
                bump: floorMap.ground.maps.bump,
                roughness: floorMap.ground.maps.roughness,
            }).getValue(),
            wrapS: floorMap.ground.wrapS,
            wrapT: floorMap.ground.wrapT,
            repeat: floorMap.ground.repeat,
            magFilter: floorMap.ground.magFilter,
            minFilter: floorMap.ground.minFilter,
            secondaryColor: floorMap.ground.secondaryColor,
            size: FloorMapSize.create(floorMap.ground.size).getValue(),
        });

        // create wall
        const wallOrError = FloorMapSurface.create({
            segments: FloorMapSize.create({
                width: floorMap.wall.segments.width,
                height: floorMap.wall.segments.height,
                depth: floorMap.wall.segments?.depth,
            }).getValue(),
            primaryColor: floorMap.wall.primaryColor,
            maps: FloorMapMaps.create({
                color: floorMap.wall.maps.color,
                ao: floorMap.wall.maps.ao,
                displacement: floorMap.wall.maps.displacement,
                normal: {
                    url: floorMap.wall.maps.normal.url,
                    type: floorMap.wall.maps.normal.type,
                    scale: floorMap.wall.maps.normal.scale,
                },
                bump: floorMap.wall.maps.bump,
                roughness: floorMap.wall.maps.roughness,
            }).getValue(),
            wrapS: floorMap.wall.wrapS,
            wrapT: floorMap.wall.wrapT,
            repeat: floorMap.wall.repeat,
            magFilter: floorMap.wall.magFilter,
            minFilter: floorMap.wall.minFilter,
            secondaryColor: floorMap.wall.secondaryColor,
        });        

        // create player
        const playerOrError = FloorMapPlayer.create({
            initialPosition: floorMap.player.initialPosition,
            initialDirection: floorMap.player.initialDirection,
        });

        // create map
        const mazeOrError = FloorMapMaze.create({
            size: FloorMapSize.create(floorMap.maze.size).getValue(),
            map: floorMap.maze.map,
            exitLocation: floorMap.maze.exitLocation,
        });

        const floorMapOrError = FloorMap.create(
            {
                floor: floorMap.floor,
                maze: mazeOrError.getValue(),
                fmRooms: fmRooms,
                fmElevator: fmElevatorOrError.getValue(),
                fmPassages: fmPassages,
                fmDoors: fmDoors,
                ground: groundOrError.getValue(),
                wall: wallOrError.getValue(),
                player: playerOrError.getValue(),
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
            maze: {
                size: fm.maze.size,
                map: fm.maze.map,
                exitLocation: fm.maze.exitLocation,
            },
            player: {
                initialPosition: fm.player.initialPosition,
                initialDirection: fm.player.initialDirection,
            },
            ...restOfProps,
        };
    }

    private static mapObjs(fm: FloorMap): any {
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
                    position: {
                        positionX: fD.position.posX,
                        positionY: fD.position.posY,
                        direction: fD.position.direction.value,
                    },
                };
            }),
            fmElevator: {
                elevatorId: fm.fmElevator.elevator.toString(),
                position: {
                    positionX: fm.fmElevator.position.posX,
                    positionY: fm.fmElevator.position.posY,
                    direction: fm.fmElevator.position.direction.value,
                },
            },
            fmPassages: fm.fmPassages.map(x => {
                return {
                    passageId: x.passage.toString(),
                    position: {
                        positionX: x.position.posX,
                        positionY: x.position.posY,
                        direction: x.position.direction.value,
                    },
                };
            }),
            ground: {
                segments: {
                    width: fm.ground.segments.width,
                    depth: fm.ground.segments?.depth,
                    height: fm.ground.segments?.height,
                },
                primaryColor: fm.ground.primaryColor,
                maps: {
                    color: fm.ground.maps.color,
                    ao: fm.ground.maps.ao,
                    displacement: fm.ground.maps.displacement,
                    normal: {
                        url: fm.ground.maps.normal.url,
                        type: fm.ground.maps.normal.type,
                        scale: fm.ground.maps.normal.scale,
                    },
                    bump: fm.ground.maps.bump,
                    roughness: fm.ground.maps.roughness,
                },
                wrapS: fm.ground.wrapS,
                wrapT: fm.ground.wrapT,
                repeat: fm.ground.repeat,
                magFilter: fm.ground.magFilter,
                minFilter: fm.ground.minFilter,
                secondaryColor: fm.ground.secondaryColor,
                size: {
                    width: fm.ground.size.width,
                    height: fm.ground.size?.height,
                    depth: fm.ground.size?.depth,
                },
            },
            wall: {
                segments: {
                    width: fm.wall.segments.width,
                    height: fm.wall.segments?.height,
                    depth: fm.wall.segments?.depth,
                },
                primaryColor: fm.wall.primaryColor,
                maps: {
                    color: fm.wall.maps.color,
                    ao: fm.wall.maps.ao,
                    displacement: fm.wall.maps.displacement,
                    normal: {
                        url: fm.wall.maps.normal.url,
                        type: fm.wall.maps.normal.type,
                        scale: fm.wall.maps.normal.scale,
                    },
                    bump: fm.wall.maps.bump,
                    roughness: fm.wall.maps.roughness,
                },
                wrapS: fm.wall.wrapS,
                wrapT: fm.wall.wrapT,
                repeat: fm.wall.repeat,
                magFilter: fm.wall.magFilter,
                minFilter: fm.wall.minFilter,
                secondaryColor: fm.wall.secondaryColor,
            },
        };
    }
}
