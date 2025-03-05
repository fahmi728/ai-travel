import React from "react";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-fill rounded-xl"
        alt=""
        srcset=""
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{trip?.userSelection?.location}</h2>
        <div className="flex gap-5 ">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            📅 {trip?.userSelection?.days} Day{" "}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            💵 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            🧳 {trip?.userSelection?.infos}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
