import { ValueObject } from "@money-manager/shared-kernel/dist";
import { InvalidEmailError } from "./InvalidEmailError";

interface EmailProps {
  value: string;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/;

export class Email extends ValueObject<EmailProps> {
  private constructor(name: string) {
    super({ value: name });
  }

  static create(email: string) {
    if (typeof email !== "string" || !emailRegex.test(email)) {
      console.log(emailRegex.test(email), email);
      throw new InvalidEmailError();
    }

    return new Email(email);
  }

  get value() {
    return this.props.value;
  }
}
