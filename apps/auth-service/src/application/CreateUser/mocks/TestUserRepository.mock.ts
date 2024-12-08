import { User } from "../../../domain/User/aggregates/User";
import { UserRepository } from "../../../domain/User/repositories/UserRepository";

export class TestUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async connect(): Promise<void> {
    console.log("Connected");
  }

  async disconnect(): Promise<void> {
    console.log("Disconnected");
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
