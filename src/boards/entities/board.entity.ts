import { Reply } from 'src/replies/entities/reply.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  writer: string;
  @Column()
  title: string;
  @Column()
  contents: string;

  @OneToMany(() => Reply, (reply) => reply.board)
  replies: Reply[];
}
