import { IsString } from 'class-validator';

export class CreateBoardInput {
  @IsString()
  writer: string;

  @IsString()
  title: string;

  @IsString()
  contents: string;
}

export class UpdateBoardInput {
  title: string;
  contents: string;
}

