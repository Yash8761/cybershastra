import apiClient from '@/lib/api-client';

interface Log {
  timestamp: string;
  input: string;
  action: string;
  credits_used: number;
}

interface LogsResponse {
  logs: Log[];
}

export const logService = {
  async fetchLogs(): Promise<LogsResponse> {
    try {
      const response = await apiClient.post<LogsResponse>('/logs');
      return response.data;
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch logs. Please try again.';
      throw new Error(errorMessage);
    }
  },
};