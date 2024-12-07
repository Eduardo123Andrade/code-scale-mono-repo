import bcrypt from "bcrypt";
import { ValueObject } from "@money-manager/shared-kernel/dist";
import { InvalidPasswordError } from "./InvalidPasswordError";
import { NotStrongPasswordError } from "./NotStrongPasswordError";

interface EmailProps {
  value: string;
}

const strongPasswordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export class HashedPassword extends ValueObject<EmailProps> {
  private constructor(name: string) {
    super({ value: name });
  }

  static create(password: string) {
    if (typeof password !== "string" || password.length !== 60)
      throw new InvalidPasswordError();

    if (!strongPasswordRegex.test(password)) throw new NotStrongPasswordError();

    return new HashedPassword(password);
  }

  async compare(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.value);
  }

  get value() {
    return this.props.value;
  }
}
