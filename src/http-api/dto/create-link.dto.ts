import { IsNotEmpty, IsUrl, IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsOptional()
  @IsString()
  customName?: string;

  @IsUrl()
  @IsNotEmpty()
  redirect: string;
}
