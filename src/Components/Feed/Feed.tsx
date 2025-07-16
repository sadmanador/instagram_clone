// ExampleComponent.tsx

import { useGetData } from "../../hooks/useGetData";
import { PEXELS_API_KEY } from "../../utils/keys";



export default function Feed() {
  const natureImages = useGetData({
    queryKey: "pexels-images",
    url: "https://api.pexels.com/v1/search",
    params: {
      query: "nature",
      per_page: 30,
      orientation: "landscape",
    },
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  const peopleVideos = useGetData({
    queryKey: "pexels-videos",
    url: "https://api.pexels.com/videos/search",
    params: {
      query: "people",
      orientation: "portrait",
      size: "medium",
      per_page: 20,
    },
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  const fakeStore = useGetData({
    queryKey: "fakestore",
    url: "https://fakestoreapi.com/products",
  });

  if (natureImages.isLoading || peopleVideos.isLoading || fakeStore.isLoading)
    return <p>Loading...</p>;
  if (natureImages.error || peopleVideos.error || fakeStore.error)
    return <p>Error occurred!</p>;

  return (
    <div>
      <h2>🌿 Nature Images</h2>
      <ul>
        {natureImages.data.photos.map((img: any) => (
          <li key={img.id}>
            <img src={img.src.medium} alt={img.photographer} width={200} />
          </li>
        ))}
      </ul>

      <h2>👥 People Videos</h2>
      <ul>
        {peopleVideos.data.videos.map((video: any) => (
          <li key={video.id}>
            <video width={200} controls>
              <source src={video.video_files[0].link} type="video/mp4" />
            </video>
          </li>
        ))}
      </ul>

      <h2>🛒 Fake Store Products</h2>
      <ul>
        {fakeStore.data.map((product: any) => (
          <>
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>
            <img src={product.image} alt={product.title} />
          </>
        ))}
      </ul>
    </div>
  );
}
