import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import UserModal from "./UserModal";
import parse from 'html-react-parser';

function JobModal({ job, setIsmodalVisible }: any) {
  const [assignedVisible, setAssignedVisible] = React.useState<boolean>(false);
  const [who, setWho] = React.useState<string>("");

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div className="w-[40rem] flex gap-x-5  pl-10 p-2 items-center">
          <span className="font-poppins text-[1rem] font-bold text-center">
            Job Details
          </span>
          {job?.assignedTo && (
            <span
              className="font-poppins py-1 px-3 bg-orange text-white rounded-md border-[1px] cursor-pointer border-green-500"
              onClick={() => {
                setAssignedVisible(true);
                setWho("Freelancer");
              }}
            >
              Assigned to {job?.assignedTo.username}
            </span>
          )}
        </div>
        <i
          className="p-1 ml-auto float-right"
          onClick={() => setIsmodalVisible(false)}
        >
          <AiOutlineClose
            size={30}
            className="text-red-900 block cursor-pointer"
          />
        </i>
      </div>
      {/* body starts  */}
      <div className="p-4">
        <div className="flex flex-row">
          <div className="w-[15%] flex flex-col gap-y-2 items-center">
            <img
              src={job?.postedBy.profilePic.url}
              alt="profile"
              className="w-[5rem] h-[5rem] rounded-full"
            />
            <span
              className="text-orange hover:underline font-poppins text-xs cursor-pointer"
              onClick={() => {
                setWho("jobProvider");
                setAssignedVisible(true);
              }}
            >
              View
            </span>
          </div>
          <div className="flex flex-col gap-y-1 w-[85%]">
            <span className="font-poppins text-lg font-bold">
              {job?.postedBy.username}
            </span>
            <span className="font-poppins text-sm">{job?.postedBy.email}</span>
            <span className="font-poppins text-sm">
              {job?.postedBy.phoneNumber}
            </span>
            <span className="font-poppins text-sm font-bold">{job?.title}</span>
            <div>
              <p className="font-poppins text-xs bg-slate-100 rounded-md h-[9rem] p-4 overflow-y-scroll">
                {parse(job?.job_description)}
              </p>
            </div>
            <div className="flex gap-x-2 overflow-x-scroll mt-2">
              {job?.skills_required?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-4 py-2 bg-slate-100 font-poppins text-orange "
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex gap-x-2 overflow-x-scroll mt-2">
              {job?.payment_method?.map((payment: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-4 py-2 bg-slate-100 font-poppins text-orange "
                >
                  {payment}
                </span>
              ))}
            </div>
            <div className="px-4 py-1 bg-red-500 rounded-md flex items-center justify-center mt-4">
              <span className=" text-white">Delete</span>
            </div>
          </div>
        </div>
      </div>
      {/* body end  */}
      {/* view  */}
      {assignedVisible && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {who === "Freelancer" ? (
              <UserModal
                singleFreelancer={job?.assignedTo}
                props={setAssignedVisible}
              />
            ) : (
              <UserModal
                singleFreelancer={job?.postedBy}
                props={setAssignedVisible}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobModal;
