import { DomainError } from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { InvalidNameError } from "./InvalidNameError";

describe("src/domain/User/valueObjects/InvalidNameError", () => {
  it("should be defined", () => {
    expect(InvalidNameError).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const error = new InvalidNameError();

    expect(error).toBeInstanceOf(DomainError);
  });

  describe("constructor", () => {
    it("should set error code to INVALID_USER_NAME", () => {
      const error = new InvalidNameError();

      expect(error.code).toBe("INVALID_USER_NAME");
    });

    it("should set error exposable to true", () => {
      const error = new InvalidNameError();

      expect(error.exposable).toBeTruthy();
    });
  });
});
