export interface UserDto {
  id?: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateUserPayload extends Pick<
  UserDto,
  "email" | "name" | "id"
> {
  password: string;
  reTypePassword?: string;
}
