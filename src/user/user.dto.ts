import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
import { UserRole } from "./user.entity";

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("IN", { message: "Phone number must be valid" })
  phone: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber("IN", { message: "Phone number must be valid" })
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
