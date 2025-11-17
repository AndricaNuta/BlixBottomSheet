import { useCallback, useState } from 'react';
import { Message } from '../components/types/message';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleChangeInput = useCallback((txt: string) => {
    setInputValue(txt);
  }, []);

  const handleSend = useCallback(
    async (textFromButton?: string) => {
      const text = (textFromButton ?? inputValue).trim();
      if (!text || isSending) return;

      setInputValue('');
      setIsSending(true);

      const timestamp = Date.now();
      const userId = `${timestamp}-user`;
      const loadingId = `${timestamp}-loading`;
      const requestId = `${timestamp}-request`;

      const userMessage: Message = {
        id: userId,
        sender: 'user',
        text,
      };

      const loadingMessage: Message = {
        id: loadingId,
        sender: 'bot',
        text: 'Thinking…',
        loading: true,
      };

      setMessages(prev => [...prev, userMessage, loadingMessage]);

      try {
        const answer = await chatService.sendMessage(text, requestId);

        setMessages(prev => {
          const withoutLoading = prev.filter(m => m.id !== loadingId);
          return [...withoutLoading, answer];
        });
      } finally {
        setIsSending(false);
      }
    },
    [inputValue, isSending],
  );

  const handleFollowUpPress = useCallback(
    (followUp: string) => {
      handleSend(followUp);
    },
    [handleSend],
  );

  return {
    inputValue,
    messages,
    isSending,
    handleChangeInput,
    handleSend,
    handleFollowUpPress,
  };
};
