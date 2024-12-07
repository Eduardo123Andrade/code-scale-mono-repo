import { DomainError } from "@money-manager/shared-kernel/dist";

export class InvalidNameError extends DomainError {
  constructor() {
    super("INVALID_USER_NAME", true);
  }
}
