import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorMapId } from "./valueObj/floorMapId";
import { Guard } from "../core/logic/Guard";
import { FloorId } from "./valueObj/floorId";


interface FloorMapProps {
    floor: FloorId; 
    file: string;
}

export class FloorMap extends AggregateRoot<FloorMapProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): FloorMapId {
        return new FloorMapId(this.id.toValue());
    }

    get floor(): FloorId {
        return this.props.floor;
    }

    get file(): string {
        return this.props.file;
    }


    private constructor(props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {

        const guardedProps = [
            { argument: props.floor, argumentName: 'floor' },
            { argument: props.file, argumentName: 'file' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMap>(guardResult.message)
        }
        
        const floorMap = new FloorMap({ ...props }, id);
        return Result.ok<FloorMap>(floorMap)

    }
}

