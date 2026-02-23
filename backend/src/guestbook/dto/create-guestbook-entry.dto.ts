import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateGuestbookEntryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  sticker?: string;
}
