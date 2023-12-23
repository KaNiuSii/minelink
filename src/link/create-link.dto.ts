import { IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateLinkDto {
  @IsOptional()
  customName?: string;

  @IsUrl()
  @IsNotEmpty()
  redirect: string;
}
