
import {StyleSheet} from 'react-native';

export const FOOTER_HEIGHT = 80;

export const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handle: {
    backgroundColor: '#4b5563',
    width: 40,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
  },
    chatBody: {
    flex: 1,          
  },
  header: {
    paddingVertical: 8,
  },
  title: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },

messagesScroll: {
  flex: 1,
},
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '92%',
  },
  messageUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#4f46e5',
  },
  messageBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#374151',
  },
  messageSender: {
    color: '#d1d5db',
    fontSize: 10,
    marginBottom: 2,
  },
  messageText: {
    color: '#f9fafb',
    fontSize: 14,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  loadingText: {
    color: '#e5e7eb',
    fontSize: 11,
    marginLeft: 6,
  },
  followUpsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 6,
  },
  followUpButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9ca3af',
    backgroundColor: '#111827',
  },
  followUpText: {
    fontSize: 11,
    color: '#e5e7eb',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 6,
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#4b5563',
    gap: 8,
    backgroundColor: '#111827',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#f9fafb',
    fontSize: 14,
    borderRadius: 12,
    backgroundColor: '#1f2937',
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#022c22',
    fontWeight: '600',
    fontSize: 13,
  },
});

