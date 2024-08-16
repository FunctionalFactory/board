export class CreateReplyInput {
  writer: string;
  contents: string;
  boardId: number;
  parentReplyId?: number;
}
