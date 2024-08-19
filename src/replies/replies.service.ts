import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { Board } from 'src/boards/entities/board.entity';
import {
  IRepliesServiceCreate,
  IRepliesServiceFindReplies,
} from './interfaces/replies.service.interface';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly repliesRepository: Repository<Reply>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  private async findBoardById(boardId: number): Promise<Board> {
    return this.boardsRepository.findOne({ where: { id: boardId } });
  }

  private async findReplyById(replyId: number): Promise<Reply> {
    return this.repliesRepository.findOne({ where: { id: replyId } });
  }

  async findAll({ boardId }: IRepliesServiceFindReplies): Promise<Reply[]> {
    return this.repliesRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async create({ createReplyInput }: IRepliesServiceCreate): Promise<string> {
    const { boardId, parentReplyId, ...replyData } = createReplyInput;
    const board = await this.findBoardById(boardId);
    const parentReply = parentReplyId
      ? await this.findReplyById(parentReplyId)
      : null;

    const newReply = this.repliesRepository.create({
      ...replyData,
      board,
      parentReply,
    });

    await this.repliesRepository.save(newReply);
    return '댓글이 성공적으로 등록되었습니다.';
  }
}
