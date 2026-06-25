import type { AxiosRequestConfig } from 'axios';

import { apiClient } from './apiClient';

export const orvalMutator = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.request<T>({
    ...config,
    ...options,
  });

  return response.data;
};
