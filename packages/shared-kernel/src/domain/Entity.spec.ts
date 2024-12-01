import { describe, expect, it } from "vitest";
import { Entity } from "./Entity";
import { Uuid } from "./valueObjects/Uuid";
import { ValueObject } from "./ValueObject";

interface TestEntityProps {
  value: string;
}

class TestEntity extends Entity<TestEntityProps> {
  static create(props: TestEntityProps, id?: Uuid): TestEntity {
    return new TestEntity(props, id);
  }

  get value(): string {
    return this.props.value;
  }
}

describe("src/domain/Entity", () => {
  it("should be defined", () => {
    expect(Entity).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const entity = TestEntity.create({ value: "test" });

    expect(entity).toBeInstanceOf(ValueObject);
  });

  describe("created", () => {
    it("should generate a new uuid, if none is provided as parameter", () => {
      const entity = TestEntity.create({ value: "test" });

      expect(entity.id).toBeDefined();
    });

    it("should set the id if was provided as parameter", () => {
      const expectedUuid = Uuid.create();
      const entity = TestEntity.create({ value: "test" }, expectedUuid);

      expect(entity.id.value).toBe(expectedUuid.value);
    });
  });
});
