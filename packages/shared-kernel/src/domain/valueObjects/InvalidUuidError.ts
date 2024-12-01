import { DomainError } from "../DomainError";

export class InvalidUuidError extends DomainError {
  constructor() {
    super("INVALID_UUID", false);
  }
}
