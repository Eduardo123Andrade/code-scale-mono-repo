import { describe, expect, it } from "vitest";
import { InvalidUuidError } from "./InvalidUuidError";
import { DomainError } from "../DomainError";
// import { Uuid } from "./Uuid";
// import { ValueObject } from "../ValueObject";
// import { v4, validate } from "uuid";

describe("src/domain/valueObjects/InvalidUuidError", () => {
  it("should be defined", () => {
    expect(InvalidUuidError).toBeDefined();
  });

  it("should be an instance of DomainError", () => {
    expect(new InvalidUuidError()).toBeInstanceOf(DomainError);
  });

  describe("constructor", () => {
    it("should set INVALID_UUID as error code", () => {
      const error = new InvalidUuidError();

      expect(error.code).toBe("INVALID_UUID");
    });

    it("should set exposable to false", () => {
      const error = new InvalidUuidError();

      expect(error.exposable).toBeFalsy();
    });
  });
});
