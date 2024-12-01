import { describe, expect, it } from "vitest";
import { ValueObject } from "./ValueObject";

interface TestProps {
  value: string;
}

class TestValueObject extends ValueObject<TestProps> {
  static create(props: TestProps): TestValueObject {
    return new TestValueObject(props);
  }

  get value(): string {
    return this.props.value;
  }
}

describe("src/domain/ValueObject", () => {
  describe("constructor", () => {
    it("should be defined", () => {
      expect(ValueObject).toBeDefined();
    });

    it("should set the props in the construct", () => {
      const expectProps: TestProps = { value: "test" };
      const ValueObject = TestValueObject.create(expectProps);

      expect(ValueObject.value).toBe(expectProps.value);
    });
  });
});
