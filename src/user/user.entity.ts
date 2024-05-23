import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  REGULAR = "regular",
}

export const USER_TABLENAME = "users";

@Entity({ name: USER_TABLENAME })
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR,
    nullable: false,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
