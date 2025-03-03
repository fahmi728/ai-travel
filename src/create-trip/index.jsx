import React, { useEffect, useState } from "react";
import MinePlacesAutocomplete from "../searchelemnt/MinePlacesAutocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetList,
  SelectTravelesList,
  AI_PROMPT,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AImodal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';


function CreateTrip() {
  const [fromDate, setfromDate] = useState([]);
  const [location, setLocation] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    setfromDate({
      ...fromDate,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(fromDate);
  }, [fromDate]);

  const Login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)

  })

  const OngenrateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (fromDate?.days < 1 && !fromDate?.infos) ||
      !fromDate?.budget ||
      !fromDate?.location
    ) {
      toast("Please fill all the fields", "error");
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", fromDate.location)
      .replace("{totalDays}", fromDate.days)
      .replace("{infos}", fromDate.infos)
      .replace("{budget}", fromDate.budget)
      .replace("{totalDays}", fromDate.days);
    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };

  const GetUserProfile = (tokeninfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokeninfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokeninfo?.access_token}`
      }
    }).then((res)=>{
      console.log(res.data);
      localStorage.setItem("user",JSON.stringify(res.data));
      setOpenDialog(false);

      OngenrateTrip();
    })
  }




  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl ">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information about your trip and we will take
        care of the rest.
      </p>

      <div className="mt-16 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <MinePlacesAutocomplete
            onSelect={(value) => {
              setLocation(value);
              handleInputChange("location", value); // Use `value`, not `v`
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning to trip?
          </h2>
          <Input
            type="number"
            placeholder={"Ex.4"}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {SelectBudgetList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${fromDate.budget === item.title ? "bg-blue-100 shadow-lg" : ""}
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.description}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("infos", item.description)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${
                  fromDate.infos === item.description
                    ? "bg-blue-100 shadow-lg"
                    : ""
                }
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.description}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={OngenrateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sgin In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button 

              onClick={Login}
              className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
