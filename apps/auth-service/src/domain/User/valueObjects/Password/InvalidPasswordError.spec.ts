import { DomainError } from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { InvalidPasswordError } from "./InvalidPasswordError";

describe("src/domain/User/valueObjects/InvalidPasswordError", () => {
  it("should be defined", () => {
    expect(InvalidPasswordError).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const error = new InvalidPasswordError();

    expect(error).toBeInstanceOf(DomainError);
  });

  describe("constructor", () => {
    it("should set error code to INVALID_USER_PASSWORD", () => {
      const error = new InvalidPasswordError();

      expect(error.code).toBe("INVALID_USER_PASSWORD");
    });

    it("should set error exposable to true", () => {
      const error = new InvalidPasswordError();

      expect(error.exposable).toBeTruthy();
    });
  });
});
