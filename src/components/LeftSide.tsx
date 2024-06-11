import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdOutlinePayment, MdReport } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaNetworkWired } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { MdAirplanemodeActive } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

function LeftSide() {
  return (
    <div className="flex flex-col gap-y-3">
      {/* dashboard  */}
      {/* start */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-center gap-y-6 select-none">
          <Link to="/">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <MdDashboard color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Dashboard</span>
            </div>
          </Link>
          <Link to="/job-seekers">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <PiUsersThreeFill color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Job Seekers</span>
            </div>
          </Link>

          <Link to="/job-providers">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <RiUserSettingsFill color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Job Providers</span>
            </div>
          </Link>
          <Link to="/payment">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <MdOutlinePayment color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Payments</span>
            </div>
          </Link>
          <Link to="/reports">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <MdReport color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Reports</span>
            </div>
          </Link>
          <Link to="/jobs">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <FaNetworkWired color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Jobs</span>
            </div>
          </Link>
          <Link to="/gigs">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <GiGraduateCap color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Gigs</span>
            </div>
          </Link>
          <Link to="/deactivated-accounts">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <MdAirplanemodeActive color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Deactivated</span>
            </div>
          </Link>
          <Link to="/create-notification">
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <i>
                <IoIosCreate color="#79AC78" size={25} />
              </i>
              <span className="font-poppins">Notification</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
