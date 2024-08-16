import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReplyInput {
  @IsString()
  writer: string;

  @IsString()
  contents: string;

  @IsNumber()
  boardId: number;

  @IsOptional()
  @IsNumber()
  parentReplyId?: number;
}
