import { CreateReplyInput } from '../dto/create-reply.input';
import { UpdateReplyInput } from '../dto/update-reply.input';

export interface IRepliesServiceCreate {
  createReplyInput: CreateReplyInput;
}

export interface IRepliesServiceFindReplies {
  boardId: number;
}

export interface IRepliesServiceUpdate {
  id: number;
  updateReplyInput: UpdateReplyInput;
}

export interface IRepliesServiceDelete {
  id: number;
}