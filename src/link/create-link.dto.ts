import { IsNotEmpty, IsUrl, IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsUrl()
  @IsNotEmpty()
  redirect: string;
}
