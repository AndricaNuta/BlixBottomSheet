export const createFollowUps = (base: string): string[] => {
  const trimmed = base.trim();
  if (!trimmed) {
    return ['Tell me more', 'Give an example', 'Explain simpler'];
  }

  return [
    `Explain "${trimmed}" in simpler terms`,
    `Give a real-world example for "${trimmed}"`,
    `How can I apply "${trimmed}"?`,
  ];
};
