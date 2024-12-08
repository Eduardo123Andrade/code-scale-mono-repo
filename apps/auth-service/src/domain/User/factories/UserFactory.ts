import { Uuid } from "@money-manager/shared-kernel/dist";
import { User } from "../aggregates/User";
import { PlainTextPassword } from "../valueObjects/Password/PlainTextPassword";
import { Name } from "../valueObjects/Name/Name";
import { Email } from "../valueObjects/Email/Email";

interface CreateWithPlainTextPassword {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class UserFactory {
  static async createWithPlainTextPassword(
    user: CreateWithPlainTextPassword,
  ): Promise<User> {
    const { email, name, password, id } = user;

    const plainTextPassword = PlainTextPassword.create(password);
    const hashedPassword = await plainTextPassword.hash();

    const createdUser = User.create(
      {
        name: Name.create(name),
        email: Email.create(email),
        password: hashedPassword,
      },
      Uuid.create(id),
    );

    return createdUser;
  }
}
