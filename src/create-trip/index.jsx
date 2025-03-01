import React from "react";
import MinePlacesAutocomplete from "../searchelemnt/MinePlacesAutocomplete";
import { Input } from "../components/ui/input";

function CreateTrip() {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl ">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information about your trip and we will take
        care of the rest.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <MinePlacesAutocomplete />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
           How many days are you planning to trip?
          </h2>
          <Input type="number"  placeholder={'Ex.4'} />

        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
