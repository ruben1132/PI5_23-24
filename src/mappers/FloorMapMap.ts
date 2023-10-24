import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IFloorMapPersistence } from '../dataschema/IFloorMapPersistence';

import IFloorMapDTO from "../dto/IFloorMapDTO";
import { FloorMap } from "../domain/floorMap";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FloorMapMap extends Mapper<FloorMap> {

    public static toDTO(floorMap: FloorMap): IFloorMapDTO {
        const restOfProps = this.mapObjs(floorMap);

        return {
            floor: floorMap.floor.domainId.toValue(),
            map: floorMap.map,
            ...restOfProps
        } as IFloorMapDTO;
    }

    public static toDomain(floorMap: any | Model<IFloorMapPersistence & Document>): FloorMap {
        
        const floorMapOrError = FloorMap.create(
            floorMap,
            new UniqueEntityID(floorMap.domainId)
        );
        
        floorMapOrError.isFailure ? console.log(floorMapOrError.error) : '';

        return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
    }

    public static toPersistence(fm: FloorMap): any {
        const restOfProps = this.mapObjs(fm);

        return {
            domainId: fm.id.toString(),
            floor: fm.floor.domainId.toValue(),
            map: fm.map,
            ...restOfProps
        }
    }

    private static mapObjs(fm: FloorMap): any {

        return {
            fmRooms: fm.fmRooms.map(fR => {
                return {
                    roomId: fR.room.toValue(),
                    startX: fR.dimensions.startX,
                    startY: fR.dimensions.startY,
                    endX: fR.dimensions.endX,
                    endY: fR.dimensions.endY
                }
            }
            ),
            fmDoors: fm.fmDoors.map(fD => {
                return {
                    positionX: fD.position.posX,
                    positionY: fD.position.posY,
                    direction: fD.position.direction.value
                }
            }),
            fmElevator: {
                elevatorId: fm.fmElevator.elevator.toValue(),
                positionX: fm.fmElevator.position.posX,
                positionY: fm.fmElevator.position.posY,
                direction: fm.fmElevator.position.direction.value
            },
            fmPassages: fm.fmPassages.map(x => {
                return {
                    passageId: x.passage.toValue(),
                    positionX: x.position.posX,
                    positionY: x.position.posY,
                    direction: x.position.direction.value
                }
            })
        }
    }
}