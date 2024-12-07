import { DomainError } from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { NotStrongPasswordError } from "./NotStrongPasswordError";

describe("src/domain/User/valueObjects/NotStrongPasswordError.spec", () => {
  it("should be defined", () => {
    expect(NotStrongPasswordError).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const error = new NotStrongPasswordError();

    expect(error).toBeInstanceOf(DomainError);
  });

  describe("constructor", () => {
    it("should set error code to NOT_STRONG_USER_PASSWORD", () => {
      const error = new NotStrongPasswordError();

      expect(error.code).toBe("NOT_STRONG_USER_PASSWORD");
    });

    it("should set error exposable to true", () => {
      const error = new NotStrongPasswordError();

      expect(error.exposable).toBeTruthy();
    });
  });
});
