import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Explore from "../../pages/Explore/Explore";
import Home from "../../pages/Home/Home";
import Reels from "../../pages/Reels/Reels";
import StoryViewer from "../../pages/StoryViewer/StoryViewer";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/reels",
        element: <Reels />,
      },
    ],
  },
  {
    path: "/stories/:storyId",
    element: <StoryViewer />,
  },
]);
