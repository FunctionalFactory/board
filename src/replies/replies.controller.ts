import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyInput } from './dto/create-reply.input';
import {
  IRepliesServiceCreate,
  IRepliesServiceFindReplies,
} from './interfaces/replies.service.interface';
import { Reply } from './entities/reply.entity';

@Controller('replies')
export class RepliesController {
  constructor(
    private readonly repliesService: RepliesService, //
  ) {}

  @Get()
  fetchReplies(
    @Query() query: IRepliesServiceFindReplies, //
  ): Promise<Reply[]> {
    return this.repliesService.findAll(query);
  }

  @Post()
  createReply(
    @Body() createReplyInput: CreateReplyInput, //
  ): Promise<string> {
    const input: IRepliesServiceCreate = { createReplyInput };
    return this.repliesService.create(input);
  }
}
