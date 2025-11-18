import React, {
  useCallback,
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

export function BottomSheetChat({ index, onIndexChange }: BottomSheetChatProps) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);
  const autoScrollRef = useRef(true);
  const viewportHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const { messages, isSending, handleSend, handleFollowUpPress } = useChat();

  const snapPoints = useMemo(() => ['20%', '90%'], []);
  const pendingResizeAdjustRef = useRef(false);

  const handleInputFocus = useCallback(() => {
    onIndexChange(1);
  }, [onIndexChange]);

  const handleInputBlur = useCallback(() => {
    onIndexChange(0);
  }, [onIndexChange]);

 const handleSheetChange = useCallback(
  (newIndex: number) => {
    onIndexChange(newIndex);
    if (autoScrollRef.current) {
      pendingResizeAdjustRef.current = true;
      }
    },
    [onIndexChange],
  );

  const handleListScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;

      // remember latest sizes for offset calculation
      viewportHeightRef.current = layoutMeasurement.height;
      contentHeightRef.current = contentSize.height;
      const viewportBottom = layoutMeasurement.height + contentOffset.y;
      // bottom of the *last message*, ignoring the invisible part of bottom padding
      const lastMessageBottom = contentSize.height - FOOTER_HEIGHT;

      autoScrollRef.current = viewportBottom >= lastMessageBottom;
    },
    [],
  );

  // when content height changes (new message), if we *should* auto-scroll,
 const handleContentSizeChange = useCallback(
  (_w: number, h: number) => {
    contentHeightRef.current = h;

    if (!autoScrollRef.current) return;

    const viewportHeight = viewportHeightRef.current;
    if (!viewportHeight) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd?.({ animated: true });
      });
      return;
    }
    // Scroll so viewport bottom = content bottom.
    const offset = Math.max(0, h - viewportHeight);

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset,
        animated: true,
      });
    });
  },
  [],
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
          onContentSizeChange={handleContentSizeChange}
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
              paddingBottom: FOOTER_HEIGHT,
            },
          ]}
        />
    </BottomSheet>
  );
}

export default BottomSheetChat;
