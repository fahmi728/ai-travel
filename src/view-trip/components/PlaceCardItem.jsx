import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../../components/ui/button';
import { fetchUnsplashPhoto } from "../../service/GlobalApi";

function PlaceCardItem({ place2 }) {
  const [imageUrl, setImageUrl] = useState("/placeholder.jpg"); // Default placeholder

  useEffect(() => {
    if (!place2.placeName) return;

    const fetchImage = async () => {
      const url = await fetchUnsplashPhoto(place2.placeName);
      if (url) setImageUrl(url);
    };

    fetchImage();
  }, [place2.placeName]); // Only fetch when placeName changes

  return (
    <div className='p-3 border rounded-xl shadow-md mt-3 flex gap-5 w-full hover:bg-cyan-200 transition-all'>
      <img src={imageUrl} 
        className='w-[130px] h-[130px] rounded-xl object-cover'
        alt={place2.placeName} />
      <div className='w-full'>
        <h2 className='font-bold text-lg mb-3'>{place2.placeName}</h2>
        <p className='text-sm text-gray-500 mb-1'>📌{place2.placeDetails}</p>
        <h2 className='font-medium text-sm text-orange-600 mt-1'>🚶‍➡️{place2.timeTravel}</h2>
        <p className='text-sm text-gray-500 mb-1'>⭐{place2.rating}</p>
        <p className='text-sm font-medium text-gray-950'>💰{place2.ticketPricing}</p>
        <div className='flex gap-3 mt-3 justify-end'>
          <Button className='justify-start'
            onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=' + place2.geoCoordinates.latitude + "," + place2.geoCoordinates.longitude, '_blank')}>
            <FaMapLocationDot /> View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCardItem;