import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards.service.interface';
import { UpdateBoardInput } from './dto/create-board.input';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async create({ createBoardInput }: IBoardsServiceCreate): Promise<string> {
    const newBoard = this.boardsRepository.create(createBoardInput);
    await this.boardsRepository.save(newBoard);
    return '게시물 등록에 성공하였습니다.';
  }

  async update(id: number, updateBoardInput: UpdateBoardInput): Promise<Board> {
    const board = await this.boardsRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    Object.assign(board, updateBoardInput);
    return this.boardsRepository.save(board);
  }

  async delete(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }
}
