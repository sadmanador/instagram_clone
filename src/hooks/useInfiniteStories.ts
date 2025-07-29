import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import axios from "axios";
import type { StoryProps } from "../types";


const STORY_PAGE_SIZE = 4;

export const useInfiniteStories = () => {
  return useInfiniteQuery<
    StoryProps[],
    unknown,
    InfiniteData<StoryProps[]>,
    ["stories"],
    number
  >({
    queryKey: ["stories"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<StoryProps[]>("/assets/story_data.json");

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid story data format");
      }

      const start = pageParam;
      const end = start + STORY_PAGE_SIZE;
      return res.data.slice(start, end);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length;
      return lastPage.length < STORY_PAGE_SIZE ? undefined : totalFetched;
    },
  });
};
