import { CreateReplyInput } from '../dto/create-reply.input';

export interface IRepliesServiceCreate {
  createReplyInput: CreateReplyInput;
}

export interface IRepliesServiceFindReplies {
  boardId: number;
}
