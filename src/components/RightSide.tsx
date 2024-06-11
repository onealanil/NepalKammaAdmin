import React from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaNetworkWired } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { axios_auth } from "../config/config";
import { Link } from "react-router-dom";
import UserLineChart from "./UserLineChart";

type Counting = {
  jobProviders: number;
  jobSeekers: number;
  jobs: number;
  gigs: number;
};


function RightSide() {
  const [counting, setCounting] = React.useState<Counting>({
    jobProviders: 0,
    jobSeekers: 0,
    jobs: 0,
    gigs: 0,
  });


  const CountAllHandler = async () => {
    try {
      const response = await axios_auth.get(`/admin/countAll`);
      if (response.status === 200) {
        setCounting({
          jobProviders: response.data.jobProviders,
          jobSeekers: response.data.freelancers,
          jobs: response.data.job,
          gigs: response.data.gigs,
        });
      }
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };


  React.useEffect(() => {
    CountAllHandler();
  }, []);

  return (
    <React.Fragment>
      <div className="w-[100%] flex flex-col gap-y-4">
        <div className="flex gap-x-3">
          <Link to="/job-providers">
            <div className=" cursor-pointer flex flex-col gap-y-2 py-8 px-14 rounded-md bg-orange items-center justify-center">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Job Providers</span>
                <RiUserSettingsFill color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobProviders}
              </span>
            </div>
          </Link>
          <Link to="/job-seekers">
            <div className=" cursor-pointer flex flex-col gap-y-2 py-8 px-14 rounded-md bg-orange items-center justify-center">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Job Seekers</span>
                <PiUsersThreeFill color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobSeekers}
              </span>
            </div>
          </Link>
          <div className=" cursor-pointer flex flex-col gap-y-2 w-[14rem] rounded-md bg-orange items-center justify-center">
            <Link to="/jobs">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Jobs</span>
                <FaNetworkWired color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobs}
              </span>
            </Link>
          </div>
          <div className=" cursor-pointer flex flex-col gap-y-2 w-[14rem] rounded-md bg-orange items-center justify-center">
            <Link to="/gigs">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Gigs</span>
                <GiGraduateCap color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.gigs}
              </span>
            </Link>
          </div>
        </div>
        <span className="font-bold">Number of Registerd members</span>
        <UserLineChart/>
      </div>
    </React.Fragment>
  );
}

export default RightSide;
