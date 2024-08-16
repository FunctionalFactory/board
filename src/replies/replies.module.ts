import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';

@Module({
  providers: [RepliesService],
})
export class RepliesModule {}
