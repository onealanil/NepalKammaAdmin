import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGlobalStore } from "../config/Store";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("currentUser");
    useGlobalStore.setState({ user: null });
    navigate("/login")
  }

  return (
    <div className="w-[100%] flex items-center justify-center">
      <div className="w-[95%] flex items-center justify-between">
        <div>
          <img
            src="./images/NepalKamma.png"
            alt="logo"
            className="w-[15rem] "
          />
        </div>
        <div className="flex items-center gap-x-2">
          <form className="flex items-center w-[40rem] mr-14">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MdOutlinePersonSearch size={25} />
              </div>
              <input
                type="text"
                id="simple-search"
                className="border font-poppins border-gray-500 text-gray-900 text-sm rounded-lg block w-full ps-12 p-2.5"
                placeholder="Search user..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg bg-orange "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          <div className="flex gap-x-2 items-center mr-24">
            <FaUserCircle color="#79AC78" size={30} />
            <div className="flex flex-col ">
              <span className="text-sm font-poppins">Admin</span>
              <span
                className="text-xs text-red-500 cursor-pointer font-poppins"
                onClick={handleLogOut}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
