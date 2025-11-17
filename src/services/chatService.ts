import { Message } from '../components/types/message';
import { createFollowUps } from '../components/utils/createFollowUps';

export type ChatServiceProps = {
  sendMessage(userText: string, requestId?: string): Promise<Message>;
};

const simulateNetworkDelay = (min = 800, max = 2000): Promise<void> => {
  const delay = min + Math.random() * (max - min);

  return new Promise<void>(resolve => {
    setTimeout(resolve, delay);
  });
};

export const chatService: ChatServiceProps = {
  async sendMessage(userText: string, requestId?: string): Promise<Message> {
    await simulateNetworkDelay();

    return {
      id: requestId ? `${requestId}-bot` : `${Date.now()}-bot`,
      sender: 'bot',
      text: `This is a simulated answer to:\n"${userText}".`,
      followUps: createFollowUps(userText),
    };
  },
};
