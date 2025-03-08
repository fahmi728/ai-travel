import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const users = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(users);
  }, []);
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="" srcset="" />
      <div>
        {users ? (
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>

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
                <h2 className="cursor-pointer " onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>LogOut</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
