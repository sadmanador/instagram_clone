import React, { useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PEXELS_API_KEY } from "../../utils/keys";
import axiosInstance from "../../services/axios";

const fetchVideos = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get("https://api.pexels.com/videos/search", {
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
  });
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
    queryKey: ["pexels-videos"],
    queryFn: fetchVideos,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  const videos = data?.pages.flatMap((page) => page.videos) || [];
  const observerRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { ref: bottomRef, inView } = useInView({ threshold: 0.3 });

  // Auto-fetch more on scroll to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Play/Pause based on visibility
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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error loading videos</p>
    );

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      {videos.map((video: any, index: number) => {
        const verticalFile =
          video.video_files.find(
            (f: any) => f.height > f.width && f.quality === "sd"
          ) || video.video_files[0];

        return (
          <div
            key={video.id}
            className="h-screen w-full flex items-center justify-center snap-start"
          >
            <video
              ref={(el) => (observerRefs.current[index] = el)}
              className="h-full"
              muted
              loop
              playsInline
              controls={false}
            >
              <source src={verticalFile.link} type="video/mp4" />
            </video>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-32 flex items-center justify-center">
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default Reels;
