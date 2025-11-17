import React, { memo } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Message } from '../types/message';
import { styles } from '../BottomSheetChat/styles'; 

type Props = {
  item: Message;
  onFollowUpPress: (followUp: string) => void;
};

const MessageBubbleComponent: React.FC<Props> = ({ item, onFollowUpPress }) => {
  const isUser = item.sender === 'user';

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.messageUser : styles.messageBot,
      ]}>
      <Text style={styles.messageSender}>{isUser ? 'You' : 'Assistant'}</Text>
      <Text style={styles.messageText}>{item.text}</Text>

      {item.loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" />
          <Text style={styles.loadingText}>Assistant is typing…</Text>
        </View>
      )}

      {!!item.followUps && item.followUps.length > 0 && (
        <View style={styles.followUpsContainer}>
          {item.followUps.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => onFollowUpPress(f)}
              style={styles.followUpButton}>
              <Text style={styles.followUpText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export const MessageBubble = memo(MessageBubbleComponent);
