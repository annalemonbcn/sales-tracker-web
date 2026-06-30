export const getInitialsAvatarUrl = (seed: string): string =>
  `https://api.dicebear.com/10.x/initials/svg?seed=${encodeURIComponent(seed)}`;
