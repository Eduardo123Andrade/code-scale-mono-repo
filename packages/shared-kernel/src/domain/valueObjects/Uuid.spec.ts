import { describe, expect, it } from "vitest";
import { Uuid } from "./Uuid";
import { ValueObject } from "../ValueObject";
import { v4, validate } from "uuid";
import { InvalidUuidError } from "./InvalidUuidError";

describe("src/domain/valueObjects/Uuid", () => {
  it("should be defined", () => {
    expect(Uuid).toBeDefined();
  });

  it("should be an instance of ValueObject", () => {
    expect(Uuid.create()).toBeInstanceOf(ValueObject);
  });

  describe("create", () => {
    describe("when id is not provided as parameter", () => {
      it("should generate a new valid uuid", () => {
        const uuid = Uuid.create();

        expect(validate(uuid.value)).toBeTruthy();
      });
    });

    describe("when a valid uuid is provided as parameter", () => {
      it("should set the valid uuid in the props", () => {
        const expectedUuid = v4();
        const uuid = Uuid.create(expectedUuid);

        expect(uuid.value).toBe(expectedUuid);
      });
    });

    describe("when a invalid uuid is provided as parameter", () => {
      it("should throw an error", () => {
        const invalidUuid = "INVALID_UUID";

        const test = () => {
          Uuid.create(invalidUuid);
        };

        expect(test).toThrowError(InvalidUuidError);
      });
    });
  });
});
