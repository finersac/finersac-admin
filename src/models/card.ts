export type CardMessageType = "success" | "info" | "error";
export interface ICardMessage {
  type: CardMessageType;
  title?: string;
  message: string;
}
