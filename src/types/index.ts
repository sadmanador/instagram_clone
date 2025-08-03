export interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export interface ExploreImage {
  id: number;
  src: {
    medium: string;
  };
  photographer: string;
  photographer_id: number;
}

export interface video_files {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}
[];

export interface ReelsProp {
  id: number;
  userId: number;
  title: string;
  body: string;
  videoUrl: string;
  thumbnailUrl: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar: string;
  };
  video_files: video_files;
}



export interface Post {
  id: number;
  type: "image" | "carousel" | "video";
  media: string[];
  caption: string;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
  likes: number;
}

export interface UseInfiniteImageParams {
  queryKey: unknown[];
  url: string;
  params: {
    per_page: number;
    query: string;
    orientation: string;
  };
  headers?: Record<string, string>;
}

export interface StoryProps {
  id: number;
  username: string;
  avatar: string;
  stories: string;
  seen: boolean;
}
