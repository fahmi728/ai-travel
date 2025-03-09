import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/ui/custom/Header.jsx";
import CreateTrip from "./create-trip/index.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";
import Setting from "./components/Setting.jsx";
import { useThemeStore } from "./components/useThemeStore.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />
  },{
    path: "/setting",
    element:<Setting />
  }

]);
const RootComponent = () => {
 const {theme}= useThemeStore();
  return (
    <div data-theme={theme}>
      <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
          <Header />
          <Toaster />
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </StrictMode>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<RootComponent />);
