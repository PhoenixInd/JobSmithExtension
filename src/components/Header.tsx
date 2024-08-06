import { useEffect, useState } from "react";
import JobSmith from "../assets/JobSmith.svg"
import "./Header.css"
import { useNavigate } from "react-router-dom";
export function Header() {
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    chrome.storage.local.remove("token");
    chrome.storage.local.remove("user");
    localStorage.removeItem("reduxState");
    setHasToken(false);
    navigate('/auth');
  }
  return (
    <header className="bg-white h-14 items-center flex p-5 w-full shadow-md justify-between">
        <div className="relative h-7 w-7 flex flex-row items-center gap-4">
          <div className="absolute h-full w-full rounded-full border-2 border-[#CCA349]"></div>
          <img src={JobSmith} className="object-cover h-full w-full rounded-full" />
          <h1 className="text-base font-bold">JobSmith</h1>
        </div>
        {hasToken && (
          <a className="logout" onClick={handleLogout}>Log out</a>
        )}
    </header>
  )
}