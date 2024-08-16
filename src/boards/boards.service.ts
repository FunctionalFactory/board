import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards.service.interface';

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
}
