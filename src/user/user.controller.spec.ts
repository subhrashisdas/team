import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserRole } from "./user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("UserController", () => {
  let controller: UserController;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  describe("findAll()", () => {
    it("should test all api", () => {});
  });
});
