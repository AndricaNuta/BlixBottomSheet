import { BottomSheetFooterProps, BottomSheetFooter, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { memo, useState, useCallback } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text, LayoutChangeEvent } from "react-native";
import { styles } from "../BottomSheetChat/styles";

type ChatFooterProps = BottomSheetFooterProps & {
  bottomSafeInset: number;
  onSend: (text: string) => void;
  isSending: boolean;
  onFocusInput: () => void;
  onBlurInput: () => void;
  onLayoutFooter?: (height: number) => void;
};

export const ChatFooter = memo(function ChatFooter({
  bottomSafeInset,
  onSend,
  isSending,
  onFocusInput,
  onBlurInput,
  onLayoutFooter,
  ...footerProps
}: ChatFooterProps) {
  const [text, setText] = useState('');
  const handleLayout = (e: LayoutChangeEvent) => {
    onLayoutFooter?.(e.nativeEvent.layout.height);
  };
  const handlePressSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setText('');
  }, [text, isSending, onSend]);

  return (
    <BottomSheetFooter {...footerProps} bottomInset={0}>
      <View
         style={[styles.inputRow, { paddingBottom: bottomSafeInset }]}
          onLayout={handleLayout} >
        <BottomSheetTextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your question..."
          placeholderTextColor="#aaa"
          style={styles.input}
          multiline
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          returnKeyType="send"
          onSubmitEditing={handlePressSend}
        />
        <TouchableOpacity
          onPress={handlePressSend}
          style={[
            styles.sendButton,
            (!text.trim() || isSending) && styles.sendButtonDisabled,
          ]}
          disabled={!text.trim() || isSending}>
          {isSending ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </BottomSheetFooter>
  );
});
