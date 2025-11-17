export type Sender = 'user' | 'bot';

export type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  loading?: boolean;
  followUps?: string[];
};