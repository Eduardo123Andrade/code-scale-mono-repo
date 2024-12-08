import { DomainEventHandler } from "@money-manager/shared-kernel/dist";
import { UserRepository } from "../../domain/User/repositories/UserRepository";
import { CreateUserRequestDto, CreateUserResponseDto } from "./CreateUserDto";
import { UserFactory } from "../../domain/User/factories/UserFactory";

export class CreateUserService {
  private userRepository: UserRepository;
  private eventHandler: DomainEventHandler;

  constructor(
    userRepository: UserRepository,
    eventHandler: DomainEventHandler,
  ) {
    this.userRepository = userRepository;
    this.eventHandler = eventHandler;
  }

  async execute(user: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const { name, email, password } = user;
    const factoredUser = await UserFactory.createWithPlainTextPassword({
      email,
      name,
      password,
    });

    await this.userRepository.create(factoredUser);
    await this.eventHandler.publish(factoredUser.events);

    return {
      id: factoredUser.id.value,
      name: factoredUser.name,
      email: factoredUser.email,
    };
  }
}
