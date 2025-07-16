// hooks/useInfiniteVideos.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios";
import { PEXELS_API_KEY } from "../utils/keys";

export const useInfiniteVideos = () => {
  return useInfiniteQuery({
    queryKey: ["pexels-videos"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(
        "https://api.pexels.com/videos/search",
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: "people",
            orientation: "portrait",
            size: "medium",
            per_page: 20,
            page: pageParam,
          },
        }
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: { page: number }) => {
      return lastPage.page + 1;
    },
  });
};
