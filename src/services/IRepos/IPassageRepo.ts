import { get } from "lodash";
import { Repo } from "../../core/infra/Repo";
import { Passage } from "../../domain/passage";
import { PassageId } from "../../domain/valueObj/passageId";

export default interface IPassageRepo extends Repo<Passage> {
    save(passage: Passage): Promise<Passage>;
    findByDomainId(passageId: PassageId | string): Promise<Passage>;
    findByIds (rolesIds: PassageId[] | string[]): Promise<Passage[]>;
    getPassages(): Promise<Passage[]>;
    getPassagesBetweenBuildings (first: string, second: string): Promise<Passage[]>;
    deletePassage(passageId: PassageId | string): Promise<Boolean>;

}