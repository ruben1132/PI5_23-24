import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/valueObj/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string, userId?: string): Promise<User>;
	findById (id: string): Promise<User>;
	deleteById (id: string): Promise<void>;
	findAll (): Promise<User[]>;
}
  