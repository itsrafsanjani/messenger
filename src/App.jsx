import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileDeviceRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileUser = mobileDeviceRegex.test(userAgent);
    setIsMobile(isMobileUser);

    function handleResize() {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="h-screen flex justify-center items-center">
          This site is not available for mobile devices.
        </div>
      ) : (
        <BrowserRouter>
          <div className="h-screen">
            <Routes>
              <Route path="/" element={<ChatPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
