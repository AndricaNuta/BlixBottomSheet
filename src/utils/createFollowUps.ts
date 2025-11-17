const trimAndShorten = (text: string, max = 80) => {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max).trimEnd() + '…';
};

const detectQuestionType = (text: string) => {
  const lowered = text.toLowerCase();

  if (lowered.startsWith('how')) return 'how';
  if (lowered.startsWith('what')) return 'what';
  if (lowered.startsWith('why')) return 'why';
  if (lowered.startsWith('when')) return 'when';
  if (lowered.startsWith('where')) return 'where';
  if (lowered.startsWith('who')) return 'who';
  if (lowered.includes('react native')) return 'react-native';
  if (lowered.includes('bottom sheet')) return 'bottom-sheet';
  if (lowered.includes('career') || lowered.includes('interview')) return 'career';

  return 'generic';
};

export const createFollowUps = (base: string): string[] => {
  const trimmed = base.trim();
  if (!trimmed) {
    return [
      'Tell me more.',
      'Give me a concrete example.',
      'Explain it in simpler terms.',
    ];
  }

  const short = trimAndShorten(trimmed);
  const type = detectQuestionType(trimmed);

  switch (type) {
    case 'react-native':
      return [
        `Can you give a code example in React Native for this?`,
        `What are common pitfalls with this in production RN apps?`,
        `How would this differ between old and new architecture?`,
      ];
    case 'bottom-sheet':
      return [
        `How can I improve the UX of this bottom sheet?`,
        `What are best practices for scrolling + keyboard in bottom sheets?`,
        `How should I structure the code for a reusable bottom sheet?`,
      ];
    case 'career':
      return [
        `How can I talk about this experience in an interview?`,
        `What would be a good bullet point for my CV based on this?`,
        `How can I turn this into a portfolio story?`,
      ];
    case 'how':
      return [
        `Can you give a step-by-step example for: "${short}"?`,
        `What are the common mistakes when doing this?`,
        `How would you test this in a real app?`,
      ];
    case 'what':
      return [
        `Can you give a simple, non-technical explanation of "${short}"?`,
        `Can you compare this to an alternative approach?`,
        `When should I NOT use this?`,
      ];
    case 'why':
      return [
        `What are the main pros and cons related to "${short}"?`,
        `Is there any real-world example that shows why this matters?`,
        `How would you explain this “why” to a junior dev?`,
      ];
    default:
      return [
        `Can you give a concrete, practical example for: "${short}"?`,
        `How would this apply in a React Native project?`,
        `What’s the next smart question I should ask about this?`,
      ];
  }
};
