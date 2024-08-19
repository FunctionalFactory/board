import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  writer: string;
  @Column()
  contents: string;

  @ManyToOne(() => Board, (board) => board.replies)
  board: Board;

  @ManyToOne(() => Reply, (reply) => reply.replies)
  parentReply: Reply;

  @OneToMany(() => Reply, (reply) => reply.parentReply)
  replies: Reply[];
}
