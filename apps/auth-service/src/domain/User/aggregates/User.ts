import {
  AggregateRoot,
  UserCreatedEvent,
  Uuid,
} from "@money-manager/shared-kernel/dist";
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
    const isNew = !id;
    const userId = id ?? Uuid.create();
    const instance = new User(props, userId);

    if (isNew) {
      const userCreatedEvent = new UserCreatedEvent(Uuid.create(), new Date(), {
        id: userId.value,
        name: props.name.value,
        email: props.email.value,
      });

      instance.addDomainEvent(userCreatedEvent);
    }

    return instance;
  }
}
