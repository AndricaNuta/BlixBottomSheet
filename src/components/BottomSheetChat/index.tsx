import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  type BottomSheetFooterProps,
  type BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FOOTER_HEIGHT, styles } from './styles';
import { MessageBubble } from '../MessageBubble';
import { useChat } from '../../hooks/useChat';
import { ChatFooter } from '../ChatFooter';
import { Message } from '../types/message';

type BottomSheetChatProps = {
  index: number;
  onIndexChange: (index: number) => void;
};

const BottomSheetChat: React.FC<BottomSheetChatProps> = ({
  index,
  onIndexChange,
}) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);
  const isAtBottomRef = useRef(true);

  const {
    messages,
    isSending,
    handleSend,
    handleFollowUpPress,
  } = useChat();

  const snapPoints = useMemo(() => ['20%', '60%', '90%'], []);

  const handleListScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 90;
      const isAtBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;

      isAtBottomRef.current = isAtBottom;
    },
    [],
  );

  useEffect(() => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(index);
    }
  }, [index]);

  useEffect(() => {
    if (!messages.length) return;
    if (!isAtBottomRef.current) return;

    listRef.current?.scrollToEnd?.({ animated: true });
  }, [messages]);

  const handleInputFocus = useCallback(() => {
    onIndexChange(2); 
  }, [onIndexChange]);

  const handleInputBlur = useCallback(() => {
    onIndexChange(1); 
  }, [onIndexChange]);

  const handleSheetChange = useCallback(
    (newIndex: number) => {
      onIndexChange(newIndex);

      if (isAtBottomRef.current) {
        requestAnimationFrame(() => {
          listRef.current?.scrollToEnd?.({ animated: false });
        });
      }
    },
    [onIndexChange],
  );

  const renderMessageItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble item={item} onFollowUpPress={handleFollowUpPress} />
    ),
    [handleFollowUpPress],
  );

  const renderFooter = useCallback(
    (footerProps: BottomSheetFooterProps) => (
      <ChatFooter
        {...footerProps}
        bottomSafeInset={insets.bottom || 0}
        onSend={handleSend}
        isSending={isSending}
        onFocusInput={handleInputFocus}
        onBlurInput={handleInputBlur}
      />
    ),
    [handleSend, isSending, handleInputFocus, handleInputBlur, insets.bottom],
  );

  // keep natural order; 
  const listData = useMemo<Message[]>(() => messages, [messages]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
      enableContentPanningGesture={false}
      topInset={insets.top}
      bottomInset={0}
      footerComponent={renderFooter}
    >
      <BottomSheetFlatList<Message>
        ref={listRef}
        data={listData}
        keyExtractor={(item: Message) => item.id}
        renderItem={renderMessageItem}
        keyboardShouldPersistTaps="handled"
        onScroll={handleListScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Chat</Text>
            <Text style={styles.subtitle}>
              Ask a question and get a simulated reply.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.messagesContent,
          {
            paddingBottom: FOOTER_HEIGHT + (insets.bottom || 0),
          },
        ]}
      />
    </BottomSheet>
  );
};

export default BottomSheetChat;
