import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput, UpdateBoardInput } from './dto/create-board.input';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  fetchBoards(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Post()
  createBoard(
    @Body() createBoardInput: CreateBoardInput
  ): Promise<string> {
    return this.boardsService.create({ createBoardInput });
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateBoardDto: UpdateBoardInput
  ): Promise<Board> {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string
): Promise<void> {
    return this.boardsService.delete(+id);
  }
}
