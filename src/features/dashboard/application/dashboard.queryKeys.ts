const COMMON_KEYS = ['dashboard'] as const;

export const dashboardQueryKeys = {
  all: COMMON_KEYS,
  summary: () => [...COMMON_KEYS, 'summary'] as const,
};
