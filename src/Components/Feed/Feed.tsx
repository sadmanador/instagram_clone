import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import type { Post } from "../../types";
import { Bookmark, Notification, Text } from "../../utils/icons";

// Import your Mute and Unmute icons components here
import { Mute, Unmute } from "../../utils/icons";

const PAGE_SIZE = 5;

export default function PostFeed() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    Post[],
    unknown,
    InfiniteData<Post[]>, 
    ["posts"],
    number
  >({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<Post[]>("/assets/post_data.json");

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid data format");
      }

      const start = pageParam;
      const end = start + PAGE_SIZE;
      return res.data.slice(start, end);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length;
      return lastPage.length < PAGE_SIZE ? undefined : totalFetched;
    },
  });

  const { ref, inView } = useInView();

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  const [activeSlide, setActiveSlide] = useState<string>("");

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.substring(1);
      const defaultSlide = data?.pages[0]?.[0]
        ? `post-${data.pages[0][0].id}-slide-0`
        : "";
      setActiveSlide(hash || defaultSlide);
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [data]);

  // Video refs
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Muted states using your style and logic:
  const [mutedStates, setMutedStates] = useState<Record<number, boolean>>({});

  // Pause/play states per video:
  const [pausedPosts, setPausedPosts] = useState<Record<number, boolean>>({});

  // Toggle play/pause when clicking video
  const togglePlayPause = (postId: number) => {
    const video = videoRefs.current.get(postId);
    if (!video) return;

    if (video.paused) {
      video.play();
      setPausedPosts((prev) => ({ ...prev, [postId]: false }));
    } else {
      video.pause();
      setPausedPosts((prev) => ({ ...prev, [postId]: true }));
    }
  };

  // When data changes, initialize muted and play videos
  useEffect(() => {
    data?.pages.flat().forEach((post) => {
      if (post.type === "video") {
        const video = videoRefs.current.get(post.id);
        if (video) {
          video.muted = mutedStates[post.id] ?? true;
          video.play().catch(() => {});
          setMutedStates((prev) => ({
            ...prev,
            [post.id]: prev[post.id] ?? true,
          }));
          setPausedPosts((prev) => ({ ...prev, [post.id]: false }));
        }
      }
    });
  }, [data]);

  // Sync mute/unmute with actual video element when mutedStates changes
  useEffect(() => {
    Object.entries(mutedStates).forEach(([postIdStr, muted]) => {
      const postId = Number(postIdStr);
      const video = videoRefs.current.get(postId);
      if (video) {
        video.muted = muted;
      }
    });
  }, [mutedStates]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Error occurred!</p>;

  return (
    <div className="w-full max-w-[470px] flex flex-col mx-auto py-8">
      {data?.pages.map((page, pageIndex) =>
        page.map((post, index) => {
          const isLastItem =
            pageIndex === data.pages.length - 1 && index === page.length - 1;

          return (
            <div
              key={post.id}
              ref={isLastItem ? ref : null}
              className="rounded-md mb-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">
                  {post.user.username}
                </span>
              </div>

              {/* Media */}
              {post.type === "image" && (
                <img
                  src={post.media[0]}
                  alt="post"
                  className="w-full h-[500px] object-cover"
                />
              )}

              {post.type === "carousel" && (
                <>
                  <div className="carousel w-full relative">
                    {post.media.map((url, idx) => {
                      const prev = idx === 0 ? post.media.length - 1 : idx - 1;
                      const next = idx === post.media.length - 1 ? 0 : idx + 1;
                      const slideId = `post-${post.id}-slide-${idx}`;
                      return (
                        <div
                          key={idx}
                          id={slideId}
                          className="carousel-item relative w-full group"
                        >
                          <img
                            src={url}
                            alt={`carousel_${idx}`}
                            className="w-full h-[500px] object-cover"
                          />
                          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                              href={`#post-${post.id}-slide-${prev}`}
                              className="btn btn-circle btn-sm"
                            >
                              ❮
                            </a>
                            <a
                              href={`#post-${post.id}-slide-${next}`}
                              className="btn btn-circle btn-sm"
                            >
                              ❯
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center space-x-2 mt-3">
                    {post.media.map((_, idx) => {
                      const slideId = `post-${post.id}-slide-${idx}`;
                      return (
                        <a
                          key={idx}
                          href={`#${slideId}`}
                          className={`w-2 h-2 btn btn-circle ${
                            activeSlide === slideId
                              ? "bg-primary"
                              : "bg-gray-400"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                </>
              )}

              {post.type === "video" && (
                <div className="relative w-full h-[500px]">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(post.id, el);
                      else videoRefs.current.delete(post.id);
                    }}
                    src={post.media[0]}
                    className="w-full h-full object-cover cursor-pointer"
                    muted={mutedStates[post.id] ?? true}
                    autoPlay
                    playsInline
                    loop
                    onClick={() => togglePlayPause(post.id)}
                    controls={false}
                  />
                  {/* Pause Icon Overlay */}
                  {pausedPosts[post.id] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 9v6m4-6v6"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Mute/Unmute button */}
                  <button
                    onClick={() =>
                      setMutedStates((prev) => ({
                        ...prev,
                        [post.id]: !(prev[post.id] ?? true),
                      }))
                    }
                    className="text-2xl absolute rounded-full bottom-4 right-4 bg-slate-800 bg-opacity-50 text-white px-3 py-1 z-50"
                    aria-label={
                      mutedStates[post.id] ? "Unmute video" : "Mute video"
                    }
                  >
                    {mutedStates[post.id] ?? true ? <Unmute /> : <Mute />}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="px-4 py-3 flex gap-4 text-xl">
                <span>
                  <Notification />
                </span>
                <span>
                  <Text />
                </span>
                <span>
                  <Bookmark />
                </span>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 text-sm">
                <p className="font-semibold mb-1">{post.likes} likes</p>
                <p className="line-clamp-2">
                  <span className="font-semibold mr-1">
                    {post.user.username}
                  </span>
                  {post.caption}
                </p>
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
