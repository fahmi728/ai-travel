import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
    const itineraryArray = Object.entries(trip?.tripData?.itinerary || {})
    .map(([day, details]) => ({
      day,
      ...details
    }))
    .reverse(); // Reverse the order
    //   console.log(itineraryArray);
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-lg'>Places To Visit</h2>
        <div >
            {itineraryArray.map((place,index)=>(
                <div key={index} className='border p-3 rounded-lg my-5 grid grid-cols-2 md:grid-cols-1 gap-5'>
                    <h2 className='font-medium text-lg' >{place.day}</h2>
                    <h2 className='mt-2 font-medium'>The Best Time to Do this activity In the <span className='font-bold'>{place.bestTimeToVisit}</span></h2>
                    {place.activities.map((place2,index)=>(
                        <div key={index} className='mt-6 border rounded-sm p-3'>
                            <PlaceCardItem place2={place2} />
                        </div>
                    ))}

                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit