import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserVersion } from "./user-version.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get(":id/versions")
  async versions(@Param("id") id: string): Promise<UserVersion[]> {
    return this.userService.versions(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
