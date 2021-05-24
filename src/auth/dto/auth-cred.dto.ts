import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredDto {
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
