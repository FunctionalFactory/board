import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyInput } from './dto/create-reply.input';
import {
  IRepliesServiceCreate,
  IRepliesServiceDelete,
  IRepliesServiceFindReplies,
  IRepliesServiceUpdate,
} from './interfaces/replies.service.interface';
import { Reply } from './entities/reply.entity';
import { UpdateReplyInput } from './dto/update-reply.input';

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

  @Put(':id')
  updateReply(
    @Param('id') id: string,
    @Body() updateReplyInput: UpdateReplyInput,
  ): Promise<string> {
    const input: IRepliesServiceUpdate = { id: +id, updateReplyInput };
    return this.repliesService.update(input);
  }

  @Delete(':id')
  deleteReply(@Param('id') id: string): Promise<string> {
    const input: IRepliesServiceDelete = { id: +id };
    return this.repliesService.delete(input);
  }
}
