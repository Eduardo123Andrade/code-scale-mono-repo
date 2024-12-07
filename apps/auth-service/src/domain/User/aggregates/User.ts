import { AggregateRoot, Uuid } from "@money-manager/shared-kernel/dist";
import { Name } from "../valueObjects/Name/Name";
import { Email } from "../valueObjects/Email/Email";
import { HashedPassword } from "../valueObjects/Password/HashedPassword";

interface UserProps {
  name: Name;
  email: Email;
  password?: HashedPassword;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id: Uuid) {
    super(props, id);
  }

  static create(props: UserProps, id?: Uuid): User {
    const userId = id ?? Uuid.create();
    return new User(props, userId);
  }
}
