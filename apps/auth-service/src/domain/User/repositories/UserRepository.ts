import { User } from "../aggregates/User";

export interface UserRepository {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  create(user: User): Promise<void>;
}
