import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { Reply } from './entities/reply.entity';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Board])],
  providers: [RepliesService],
  controllers: [RepliesController],
})
export class RepliesModule {}
