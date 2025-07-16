import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteImage = ({ queryKey, url, params, headers }) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${url}?page=${pageParam}&per_page=${params.per_page}&query=${params.query}&orientation=${params.orientation}`,
        {
          headers: { ...headers },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    // The starting page number
    initialPageParam: 1,
    // Determines the parameter for the next page
    getNextPageParam: (lastPage, allPages) => {
      // If the last page returned fewer items than the per_page limit, we've reached the end
      if (lastPage.photos.length < params.per_page) {
        return undefined; // No more pages
      }
      // Otherwise, return the next page number
      return allPages.length + 1;
    },
  });
};