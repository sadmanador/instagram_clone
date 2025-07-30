import { useEffect, useState, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useInfiniteStories } from "../../hooks/useInfiniteStories";
import type { StoryProps } from "../../types";

const StoryViewer = () => {
  const { data, isLoading } = useInfiniteStories();
  const storyList: StoryProps[] = data?.pages.flat() || [];

  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentUserIndex(s.track.details.rel);
      setStoryIndex(0);
      setProgress(0);
    },
    mode: "snap",
    slides: {
      perView: 1.5,
      spacing: 16,
    },
    rubberband: false,
  });

  // Autoplay logic
  useEffect(() => {
    if (!storyList[currentUserIndex]) return;

    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const user = storyList[currentUserIndex];
          if (storyIndex + 1 < user.stories.length) {
            setStoryIndex((i) => i + 1);
            return 0;
          } else {
            const nextIndex =
              currentUserIndex + 1 < storyList.length ? currentUserIndex + 1 : 0;
            sliderInstance.current?.moveToIdx(nextIndex);
            return 0;
          }
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(intervalRef.current!);
  }, [currentUserIndex, storyIndex, storyList, sliderInstance]);

  if (isLoading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider w-full max-w-4xl px-6">
        {storyList.map((user, idx) => {
          const isCurrent = idx === currentUserIndex;
          const image = user.stories[isCurrent ? storyIndex : 0];

          return (
            <div
              key={user.id}
              className="keen-slider__slide relative flex items-center justify-center"
            >
              <div
                className={`relative w-full h-[480px] rounded-xl overflow-hidden transition-all duration-300 ${
                  isCurrent ? "scale-100 z-30" : "scale-90 z-10"
                }`}
              >
                {/* Story Image */}
                <img
                  src={image}
                  alt="story"
                  className={`w-full h-full object-cover ${
                    !isCurrent ? "brightness-50" : ""
                  }`}
                />

                {/* Progress bar */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-40">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${progress}%`,
                        transition: "width 50ms linear",
                      }}
                    />
                  </div>
                )}

                {/* Avatar & username */}
                {isCurrent && (
                  <>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black bg-opacity-60 px-3 py-1 rounded-full">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-semibold">{user.username}</span>
                    </div>

                    {/* Reply input */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4">
                      <input
                        type="text"
                        placeholder={`Reply to ${user.username}`}
                        className="w-full px-4 py-2 rounded-full border border-white bg-transparent text-white placeholder-white text-sm focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* Avatar on dimmed slides */}
                {!isCurrent && (
                  <div className="absolute top-[45%] left-24 w-24 h-24 rounded-full ring-2 ring-primary overflow-hidden z-40">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryViewer;
