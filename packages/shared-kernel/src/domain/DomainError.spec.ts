import { describe, expect, it } from "vitest";
import { DomainError } from "./DomainError";

describe("src/domain/ValueObject", () => {
  it("should be defined", () => {
    expect(DomainError).toBeDefined();
  });

  it("should be an instance of Error", () => {
    expect(new DomainError()).toBeInstanceOf(Error);
  });

  describe("constructor", () => {
    it("should accept a code parameter", () => {
      const expectCode = "TEST_ERROR";
      const error = new DomainError(expectCode, true);

      expect(error.code).toBe(expectCode);
    });

    it("should accept an exposable parameter", () => {
      const expectCode = "TEST_ERROR";
      const expectExposable = true;
      const error = new DomainError(expectCode, expectExposable);

      expect(error.exposable).toBe(expectExposable);
    });
  });
});
