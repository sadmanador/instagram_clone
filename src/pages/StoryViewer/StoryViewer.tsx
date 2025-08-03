import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useInfiniteStories } from "../../hooks/useInfiniteStories";
import type { StoryProps } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_SLIDE_DURATION = 8000;

const StoryViewer = () => {
  const { data, isLoading } = useInfiniteStories();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const [ref, slider] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 3,
        spacing: 25,
      },
      loop: true,
      slideChanged(sliderInstance) {
        const relIndex = sliderInstance.track.details.rel;
        setCurrentSlide(relIndex);
        setProgressKey((prev) => prev + 1);
      },
    }
  );

  useEffect(() => {
    if (!slider) return;

    timerRef.current = setInterval(() => {
      slider.current?.next();
    }, AUTO_SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slider]);

  const middleIndex = currentSlide + 1;
  const slideMinWidth = `calc((100% / 3) - ${25 * (2 / 3)}px)`;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Cross button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 z-30 text-white text-3xl font-bold hover:text-gray-300"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="w-[65%] overflow-hidden relative">
        <div ref={ref} className="keen-slider relative">
          {isLoading && <div>Loading...</div>}
          {data?.pages?.[0].map((story: StoryProps, index: number) => {
            const isCenter = index === middleIndex;

            return (
              <div
                className="keen-slider__slide relative"
                key={story.id}
                style={{ minWidth: slideMinWidth }}
              >
                {isCenter ? (
                  <>
                    {/* Progress bar */}
                    <div
                      key={progressKey}
                      className="absolute top-0 left-0 w-full h-1 bg-gray-700 rounded-full overflow-hidden z-10"
                    >
                      <div
                        className="h-full bg-white"
                        style={{
                          animation: `progress ${AUTO_SLIDE_DURATION}ms linear forwards`,
                        }}
                      />
                    </div>

                    {/* Story image */}
                    <img
                      src={story.stories}
                      alt={story.username}
                      className="rounded-xl object-cover w-full h-[400px]"
                    />

                    {/* Avatar + Username at top */}
                    <div className="absolute top-4 left-4 flex items-center space-x-3 z-20 bg-black bg-opacity-50 rounded-full px-3 py-1">
                      <img
                        src={story.avatar}
                        alt={`${story.username} avatar`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <span className="text-white font-semibold text-lg select-none">
                        {story.username}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Blurred and faded story image */}
                    <img
                      src={story.stories}
                      alt={story.username}
                      className="rounded-xl object-cover w-full h-[400px] filter brightness-75 blur-sm opacity-60"
                    />
                    {/* Avatar circle in center */}
                    <img
                      src={story.avatar}
                      alt={`${story.username} avatar`}
                      className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2 object-cover shadow-lg"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Left arrow */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 left-0 z-30 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-r-lg hover:bg-opacity-80"
          aria-label="Previous story"
          style={{ userSelect: "none" }}
        >
          &#8592;
        </button>

        {/* Right arrow */}
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 right-0 z-30 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-l-lg hover:bg-opacity-80"
          aria-label="Next story"
          style={{ userSelect: "none" }}
        >
          &#8594;
        </button>
      </div>

      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .keen-slider__slide:not(.keen-slider__slide--clone) {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default StoryViewer;
