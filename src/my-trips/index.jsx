import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { User } from "lucide-react";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);


  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      trips.push(doc.data());
    });
    setUserTrips(trips);
    // console.log(trips);
  };
  return( 
  <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {userTrips?.length>0? userTrips.map((trip,index) =>(
            <UserTripCardItem key={index} trip={trip} />

        ))
    :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className="h-[250px] w-full bg-gray-200 animate-pulse rounded-xl">

        </div>
    ))}
    </div>
  </div>
  );
}

export default MyTrips;
