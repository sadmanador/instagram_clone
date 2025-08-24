import { useGetData } from "../../hooks/useGetData";
import type { ExploreImage } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import { getRowSpanIndices } from "../../utils/getRowSpanIndices";
import { Heart, Text } from "../../utils/icons";
import { PEXELS_API_KEY } from "../../utils/keys";

const Explore = () => {
  const natureImages = useGetData({
    queryKey: "pexels-images",
    url: "https://api.pexels.com/v1/search",
    params: {
      query: "nature",
      per_page: 30, // Make sure your per_page is large enough for the pattern to appear
      orientation: "landscape",
    },
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (natureImages.isLoading) return <p>Loading...</p>;
  if (natureImages.error) return <p>Error occurred!</p>;

  const photos = (natureImages.data as { photos: ExploreImage[] }).photos;
  const rowSpanIndices = getRowSpanIndices(photos.length);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[75%]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 justify-center">
          {photos.map((img: ExploreImage, index: number) => {
            const isRowSpan2 = rowSpanIndices.includes(index);
            return (
              <li
                key={img.id}
                className={`relative group ${isRowSpan2 ? "row-span-2" : ""}`}
              >
                <img
                  src={img.src.medium}
                  alt={img.photographer}
                  className="h-full w-auto object-cover object-center"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100
                           flex gap-2 items-center justify-center
                           bg-[rgba(0,0,0,0.5)] group-hover:bg-[rgba(0,0,0,0.55)]"
                >
                  <p className="text-white font-semibold flex items-baseline gap-0.5">
                    <Heart /> {formatNumber(img.id)}
                  </p>
                  <p className="text-white flex items-baseline font-semibold gap-0.5">
                    <Text /> {formatNumber(img.photographer_id)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
