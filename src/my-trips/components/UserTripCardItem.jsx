import React ,{useState,useEffect}from 'react'
import { fetchUnsplashPhoto } from "../../service/GlobalApi";
import { Link } from 'react-router-dom';


function UserTripCardItem({trip}) {
    const [imageUrl, setImageUrl] = useState("/placeholder.jpg"); // Default placeholder
    
      useEffect(() => {
        if (!trip?.userSelection?.location) return;
    
        const fetchImage = async () => {
          const url = await fetchUnsplashPhoto(trip?.userSelection?.location);
          if (url) setImageUrl(url);
        };
    
        fetchImage();
      }, [trip?.userSelection?.location]); // Only fetch when placeName changes
  return (
    <Link to={`/view-trip/${trip.id}`} className='p-3 border rounded-xl shadow-md mt-3 flex gap-5 w-full hover:bg-cyan-200 transition-all justify-center'>
    <div>
        <img src={imageUrl}  className="object-cover rounded-xl h-[250px]  w-full" alt="" />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection.days} Days trip with {trip?.userSelection.budget} Budget</h2>
        </div>
    </div>
</Link>
  )
}

export default UserTripCardItem