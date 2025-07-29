import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios";

type FetchParams<T, U> = {
  queryKey: string;
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  enabled?: boolean;
  select?: (data: T) => U;
};

export function useGetData<T, U = T>({
  queryKey,
  url,
  params = {},
  headers = {},
  enabled = true,
  select,
}: FetchParams<T, U>) {
  return useQuery<T, unknown, U>({
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
