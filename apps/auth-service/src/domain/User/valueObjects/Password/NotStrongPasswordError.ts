import { DomainError } from "@money-manager/shared-kernel/dist";

export class NotStrongPasswordError extends DomainError {
  constructor() {
    super("NOT_STRONG_USER_PASSWORD", true);
  }
}
