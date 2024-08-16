import { Body, Controller, Post } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyInput } from './dto/create-reply.input';
import { IRepliesServiceCreate } from './interfaces/replies.service.interface';

@Controller('replies')
export class RepliesController {
  constructor(
    private readonly repliesService: RepliesService, //
  ) {}

  @Post()
  async createReply(
    @Body() createReplyInput: CreateReplyInput,
  ): Promise<string> {
    const input: IRepliesServiceCreate = { createReplyInput };
    return this.repliesService.create(input);
  }
}
