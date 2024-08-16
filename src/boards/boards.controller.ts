import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  fetchBoards(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Post()
  createBoard(@Body() createBoardInput: CreateBoardInput): Promise<string> {
    return this.boardsService.create({ createBoardInput });
  }
}
