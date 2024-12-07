import { ValueObject } from "@money-manager/shared-kernel/dist";
import { InvalidNameError } from "./InvalidNameError";

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  private constructor(name: string) {
    super({ value: name });
  }

  static create(name: string) {
    if (typeof name !== "string" || name.length < 3 || name.length > 50)
      throw new InvalidNameError();

    return new Name(name);
  }

  get value() {
    return this.props.value;
  }
}
