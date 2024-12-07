import { DomainError } from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { InvalidEmailError } from "./InvalidEmailError";

describe("src/domain/User/valueObjects/InvalidEmailError", () => {
  it("should be defined", () => {
    expect(InvalidEmailError).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const error = new InvalidEmailError();

    expect(error).toBeInstanceOf(DomainError);
  });

  describe("constructor", () => {
    it("should set error code to INVALID_USER_EMAIL", () => {
      const error = new InvalidEmailError();

      expect(error.code).toBe("INVALID_USER_EMAIL");
    });

    it("should set error exposable to true", () => {
      const error = new InvalidEmailError();

      expect(error.exposable).toBeTruthy();
    });
  });
});
