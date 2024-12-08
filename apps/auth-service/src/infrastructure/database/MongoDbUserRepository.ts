import { MongoDbClientSingleton } from "@money-manager/shared-kernel/dist";
import { User } from "../../domain/User/aggregates/User";
import { UserRepository } from "../../domain/User/repositories/UserRepository";
import { Collection, MongoClient } from "mongodb";

export class MongoDbUserRepository implements UserRepository {
  private client?: MongoClient;
  private collection?: Collection;

  async connect(): Promise<void> {
    this.client = await MongoDbClientSingleton.getInstance();
    const db = this.client.db("AuthService");
    this.collection = db.collection("user");
  }
  async disconnect(): Promise<void> {
    await this.client?.close();
  }
  async create(user: User): Promise<void> {
    const { email, name, id, password } = user;

    await this.collection?.insertOne({
      // @ts-ignore
      _id: id.value,
      name,
      email,
      password: password?.value,
    });
  }
}
