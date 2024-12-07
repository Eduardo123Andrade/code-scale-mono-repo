import { describe, expect, it } from "vitest";
import { ValueObject } from "@money-manager/shared-kernel/dist";
import { Name } from "./Name";
import { InvalidNameError } from "./InvalidNameError";

describe("src/domain/User/valueObjects/Name", () => {
  it("should be defined", () => {
    expect(Name).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const name = Name.create("Sheldon");

    expect(name).toBeInstanceOf(ValueObject);
  });

  describe("create", () => {
    it("should throw an error if name is not a string", () => {
      const test = () => {
        // @ts-expect-error
        Name.create(0);
      };

      expect(test).toThrowError(InvalidNameError);
    });

    it("should throw an error if name lower than 3 characters", () => {
      const test = () => {
        Name.create("12");
      };

      expect(test).toThrowError(InvalidNameError);
    });

    it("should throw an error if name bigger than 50 characters", () => {
      const test = () => {
        Name.create("012345678901234567890123456789012345678901234567890");
      };

      expect(test).toThrowError(InvalidNameError);
    });

    it("should return a instance of Name", () => {
      const name = Name.create("Sheldon Cooper");

      expect(name).toBeInstanceOf(Name);
    });

    it("should set the name on de value property", () => {
      const expectedName = "Sheldon Cooper";
      const name = Name.create(expectedName);

      expect(name.value).toBe(expectedName);
    });
  });
});
