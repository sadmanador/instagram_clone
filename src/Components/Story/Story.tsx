import { useNavigate } from "react-router-dom";
import { useInfiniteStories } from "../../hooks/useInfiniteStories";
import type { StoryProps } from "../../types";


const Story = () => {
  const { data, isLoading } = useInfiniteStories();
  const storyList: StoryProps[] = data?.pages.flat() || [];
  const navigate = useNavigate();

  const handleNavigate = (storyId: string) => {
    navigate(`/stories/${storyId}`);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading stories...</div>;
  }

  return (
    <div className="flex gap-2 px-4 py-2">
      {storyList.map((story) => (
        <div
          key={story.id}
          className={`avatar ${story.seen ? "avatar-offline" : "avatar-online"} cursor-pointer`}
          onClick={() => handleNavigate(String(story.id))}
        >
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={story.avatar} alt={story.username} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Story;
