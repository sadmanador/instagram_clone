import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";

export default function PostFeed() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fakestore"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(
        `https://fakestoreapi.com/products?limit=5&skip=${pageParam}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length;
      return lastPage.length === 0 ? undefined : totalFetched;
    },
  });

  const { ref, inView } = useInView();

  // Fetch next page when last item is in view
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error occurred!</p>;

  return (
    <div className="w-full max-w-[470px] flex flex-col mx-auto py-8">
      {data?.pages.map((page, pageIndex) =>
        page.map((product: any, index: number) => {
          const isLastItem =
            pageIndex === data.pages.length - 1 && index === page.length - 1;
          return (
            <div
              key={product.id}
              ref={isLastItem ? ref : null}
              className="rounded-md mb-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <img
                  src={`https://i.pravatar.cc/150?u=${product.id}`}
                  alt={`product_${product.id}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">product_{product.id}</span>
              </div>

              {/* Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[500px] object-contain"
              />

              {/* Actions */}
              <div className="px-4 py-3 flex gap-4 text-xl">
                <span>❤️</span>
                <span>💬</span>
                <span>📤</span>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 text-sm">
                <p className="font-semibold mb-1">${product.price}</p>
                <p className="line-clamp-2">{product.title}</p>
              </div>
            </div>
          );
        })
      )}

      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400">Loading more...</p>
      )}
    </div>
  );
}
