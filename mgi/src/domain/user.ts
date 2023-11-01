import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./valueObj/userId";
import { UserEmail } from "./valueObj/userEmail";
import { UserPassword } from "./valueObj/userPassword";
import { Guard } from "../core/logic/Guard";
import { RoleId } from "./valueObj/roleId";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: RoleId;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id)
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get role(): RoleId {
    return this.props.role;
  }

  set role(value: RoleId) {
    this.props.role = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.password, argumentName: 'password' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }

    const guardResult2 = Guard.againstEmptyBulk(guardedProps);

    if (!guardResult2.succeeded) {
      return Result.fail<User>(guardResult2.message)
    }

    const user = new User({
      ...props
    }, id);

    return Result.ok<User>(user);

  }
}
