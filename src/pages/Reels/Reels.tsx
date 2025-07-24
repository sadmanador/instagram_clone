import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import type { ReelsProp } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import {
  Bookmark,
  Mute,
  Notification,
  PaperPlane,
  Text,
  Unmute,
} from "../../utils/icons";
import { PEXELS_API_KEY } from "../../utils/keys";

// Random popular search terms
const QUERY_KEYWORDS = ["nature", "people", "travel", "animals", "technology"];
const SELECTED_QUERY =
  QUERY_KEYWORDS[Math.floor(Math.random() * QUERY_KEYWORDS.length)];

const fetchVideos = async ({ pageParam = 1 }) => {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
    params: {
      query: SELECTED_QUERY,
      per_page: 8,
      page: pageParam,
    },
  });

  return res.data;
};

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

const Reels = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["pexels-videos", SELECTED_QUERY],
    queryFn: fetchVideos,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next_page) {
        const url = new URL(lastPage.next_page);
        const nextPage = url.searchParams.get("page");
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },
  });

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["jsonplaceholder-posts"],
    queryFn: fetchPosts,
  });

  const videos = data?.pages.flatMap((page) => page.videos) || [];
  const observerRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [mutedStates, setMutedStates] = useState<Record<number, boolean>>({});

  const { ref: bottomRef, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && videos.length > 0) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, videos.length]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6,
    });

    observerRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos, handleIntersection]);

  useEffect(() => {
    if (videos.length > 0) {
      const lastVideo = videos[videos.length - 1];
      const videoId = lastVideo.id;
      const userId = lastVideo.user?.id;

      console.log("Loaded new video:", videoId, "| User:", userId);
    }
  }, [videos]);

  if (isLoading || postsLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (error || postsError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading videos or posts. Try again later.
      </p>
    );

  return (
    <div className="lg:w-[45%] mx-auto flex flex-col items-center">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory text-white bg-black overflow-x-visible">
        <h2 className="text-center py-2 text-lg font-semibold text-gray-300">
          Showing results for:{" "}
          <span className="text-white">{SELECTED_QUERY}</span>
        </h2>

        {videos.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No videos found for this query. Try refreshing.
          </p>
        ) : (
          videos.map((video: ReelsProp, index: number) => {
            const verticalFile =
              (Array.isArray(video.video_files)
                ? video.video_files.find(
                    (f) => f.height > f.width && f.quality === "sd"
                  )
                : undefined) ||
              (Array.isArray(video.video_files)
                ? video.video_files[0]
                : undefined);

            const post = postsData?.[index];

            return (
              <div
                key={video.id}
                className="h-screen flex items-center justify-center snap-start relative overflow-visible"
              >
                <video
                  ref={(el) => {
                    observerRefs.current[index] = el;
                  }}
                  className="h-full"
                  muted={mutedStates[video.id] ?? true}
                  loop
                  playsInline
                  controls={false}
                >
                  <source src={verticalFile.link} type="video/mp4" />
                </video>

                {/* 🔇 Mute/Unmute Button */}
                <button
                  onClick={() =>
                    setMutedStates((prev) => ({
                      ...prev,
                      [video.id]: !(prev[video.id] ?? true),
                    }))
                  }
                  className="text-2xl absolute rounded-full top-4 right-4 bg-s-800 bg-opacity-50 text-white rounded-full px-3 py-1  z-50"
                >
                  {mutedStates[video.id] ?? true ? <Unmute /> : <Mute />}
                </button>

                {/* 📝 Post overlay */}
                {post && (
                  <div className="absolute bottom-8 left-4 text-white p-4 rounded-lg max-w-sm font-semibold">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={`https://i.pravatar.cc/150?u=${post.id}`}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-white"
                      />
                      <span className="text-sm font-medium text-white">
                        user_{post.userId}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm mt-1">{post.body}</p>
                  </div>
                )}

                {/* 📱 Icon menu */}
                <div className="absolute lg:bottom-10 right-20 translate-x-full p-4 z-50">
                  <div className="menu bg-neutral-900 rounded-md text-3xl flex flex-col gap-4 p-2 ">
                    <div className="flex flex-col items-center text-white">
                      <Notification />
                      <span className="text-xs mt-1">
                        {formatNumber(video.id)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-white">
                      <Text />
                      <span className="text-xs mt-1">
                        {formatNumber(video.user?.id)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-white">
                      <PaperPlane />
                    </div>
                    <div className="flex flex-col items-center text-white">
                      <Bookmark />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* 🔁 Infinite scroll trigger */}
        <div ref={bottomRef} className="h-32 flex items-center justify-center">
          {isFetchingNextPage && <p>Loading more...</p>}
          {!hasNextPage && videos.length > 0 && (
            <p className="text-gray-500">No more videos to load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;
