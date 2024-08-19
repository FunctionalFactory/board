import { IsString, IsOptional } from 'class-validator';

export class UpdateReplyInput {
  @IsOptional()
  @IsString()
  contents?: string;
}