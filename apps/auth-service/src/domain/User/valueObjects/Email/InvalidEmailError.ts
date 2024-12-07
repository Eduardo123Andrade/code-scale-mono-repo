import { DomainError } from "@money-manager/shared-kernel/dist";

export class InvalidEmailError extends DomainError {
  constructor() {
    super("INVALID_USER_EMAIL", true);
  }
}
