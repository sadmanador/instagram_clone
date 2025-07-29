import { useEffect, useState } from "react";
import { useInfiniteStories } from "../../hooks/useInfiniteStories";
import type { StoryProps } from "../../types";

const Story = () => {
  const { data, isLoading } = useInfiniteStories();
  const storyList: StoryProps[] = data?.pages.flat() || [];

  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleOpen = (userIndex: number) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const handleClose = () => {
    setCurrentUserIndex(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  // Auto story transition logic
  useEffect(() => {
    if (currentUserIndex === null) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const nextUserIndex = currentUserIndex + 1;
          if (nextUserIndex < storyList.length) {
            setCurrentUserIndex(nextUserIndex);
            setCurrentStoryIndex(0);
            return 0;
          } else {
            handleClose(); // end of all stories
            return 0;
          }
        }
        return prev + 1;
      });
    }, 50); // 5 seconds

    return () => clearInterval(interval);
  }, [currentUserIndex]);

  if (isLoading) {
    return <div className="text-center py-4">Loading stories...</div>;
  }

  const currentStoryImage =
    currentUserIndex !== null
      ? storyList[currentUserIndex]?.stories[currentStoryIndex]
      : null;

  return (
    <div className="flex gap-2 px-4 py-2">
      {storyList.map((story, idx) => (
        <div
          key={story.id}
          className={`avatar ${
            story.seen ? "avatar-offline" : "avatar-online"
          } cursor-pointer`}
          onClick={() => handleOpen(idx)}
        >
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={story.avatar} alt={story.username} />
          </div>
        </div>
      ))}

      {/* Modal with dark background and story image */}
      {currentUserIndex !== null && currentStoryImage && (
        <dialog open className="modal modal-open">
          <div className="modal-box relative max-w-sm p-0 overflow-hidden  text-white">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 z-10">
              <div
                className="h-full bg-primary transition-all duration-50"
                style={{ width: `${progress}%` }}
              />
            </div>

            <figure className="bg-gray-900">
              <img
                src={currentStoryImage}
                alt="story"
                className="w-full h-80 object-cover"
              />
            </figure>

            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
              <div
                className="h-full bg-primary transition-all duration-50"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Close button */}
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle z-20"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Story;
