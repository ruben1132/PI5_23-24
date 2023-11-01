import { Result } from "../../core/logic/Result";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IPassageService {

  createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  getPassages (): Promise<Result<Array<IPassageDTO>>>;
  getPassagesBetweenBuildings (first: string, second: string): Promise<Result<Array<IPassageDTO>>>;
  deletePassage (id: string): Promise<Result<void>>;
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
}
