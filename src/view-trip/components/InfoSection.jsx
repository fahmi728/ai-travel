import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { IoIosSend } from "react-icons/io";
import { fetchUnsplashPhoto } from "../../service/GlobalApi";
// import { fetchPlaces } from "../../service/GlobalApi";

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState("/placeholder.jpg"); // Default placeholder

  useEffect(() => {
    if (!trip?.userSelection?.location) return;

    const fetchImage = async () => {
      const url = await fetchUnsplashPhoto(trip?.userSelection?.location);
      if (url) setImageUrl(url);
    };

    fetchImage();
  }, [trip?.userSelection?.location]); // Only fetch when locationImage changes

  return (
    <div>
      <img
        src={imageUrl}
        className="h-[340px] w-full object-fill rounded-xl"
        alt="Location"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              📅 {trip?.userSelection?.days} Day{" "}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              💵 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              🧳 {trip?.userSelection?.infos}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
