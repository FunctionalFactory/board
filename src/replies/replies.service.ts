import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { Board } from 'src/boards/entities/board.entity';
import { IRepliesServiceCreate } from './interfaces/replies.service.interface';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly repliesRepository: Repository<Reply>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async create({ createReplyInput }: IRepliesServiceCreate): Promise<string> {
    const { boardId, parentReplyId, ...replyData } = createReplyInput;
    const board = await this.boardsRepository.findOne({
      where: { id: boardId },
    });
    const parentReply = parentReplyId
      ? await this.repliesRepository.findOne({ where: { id: parentReplyId } })
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
