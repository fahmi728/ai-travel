import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useThemeStore } from "@/components/useThemeStore";

import { IoAddCircle } from "react-icons/io5";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { Switch } from "@/components/ui/switch";

function Header() {
  const GetUserProfile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [loding, setLoding] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const users = JSON.parse(localStorage.getItem("user"));
  const Login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  // useEffect(() => {
  //   console.log(users);
  // }, []);
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
      <img src="/final.png" alt="" srcset="" className="w-48 h-16" />
      </a>
      <div>
        {users ? (
          <div className="flex items-center space-x-3">
            <a href="/create-trip" className="text-gray-500">
              <Button variant="outline" className="rounded-full">
                <IoAddCircle /> Create Trip
              </Button>
            </a>
            <a href="/my-trips" className="text-gray-500">
              <Button variant="outline" className="rounded-full">
                <FaHistory /> My Trips
              </Button>
            </a>
            {users ? (
              <Popover>
                <PopoverTrigger>
                  <img
                    src={users?.picture}
                    className="h-[35px] w-[35px] rounded-full"
                    alt=""
                    srcset=""
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer hover:underline 
    hover:text-cyan-500 transition-all duration-300 
    mb-2 text-sm font-medium "
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    LogOut
                  </h2>
                  <div className="flex align-center items-center">
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2">
                    {" "}
                    Dark Mode
                  </label>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Get Started</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sgin In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                disabled={loding}
                onClick={Login}
                className="w-full mt-5 flex gap-4 items-center"
              >
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

export default Header;
