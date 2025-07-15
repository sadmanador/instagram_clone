// hooks/useCustomQuery.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios";

type FetchParams<T> = {
  queryKey: string;
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  enabled?: boolean;
  select?: (data: T) => any;
};

export function useGetData<T = any>({
  queryKey,
  url,
  params = {},
  headers = {},
  enabled = true,
  select,
}: FetchParams<T>) {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(url, {
        params,
        headers,
      });
      return data;
    },
    enabled,
    select,
  });
}
