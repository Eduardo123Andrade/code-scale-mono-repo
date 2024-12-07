import { DomainError } from "@money-manager/shared-kernel/dist";

export class InvalidPasswordError extends DomainError {
  constructor() {
    super("INVALID_USER_PASSWORD", true);
  }
}
