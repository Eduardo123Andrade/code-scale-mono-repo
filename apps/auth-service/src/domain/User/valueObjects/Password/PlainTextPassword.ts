import { ValueObject } from "@money-manager/shared-kernel/dist";
import bcrypt from "bcrypt";
import { HashedPassword } from "./HashedPassword";
import { InvalidPasswordError } from "./InvalidPasswordError";
import { NotStrongPasswordError } from "./NotStrongPasswordError";

interface EmailProps {
  value: string;
}

const strongPasswordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export class PlainTextPassword extends ValueObject<EmailProps> {
  private constructor(name: string) {
    super({ value: name });
  }

  static create(password: string) {
    if (typeof password !== "string") throw new InvalidPasswordError();

    if (!strongPasswordRegex.test(password)) throw new NotStrongPasswordError();

    return new PlainTextPassword(password);
  }

  async hash(): Promise<HashedPassword> {
    const hashedPassword = await bcrypt.hash(this.value, 10);
    return HashedPassword.create(hashedPassword);
  }

  get value() {
    return this.props.value;
  }
}
