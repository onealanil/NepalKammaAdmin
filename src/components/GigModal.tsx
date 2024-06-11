import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import UserModal from "./UserModal";
import parse from "html-react-parser";

function GigModal({ gig, setIsmodalVisible }: any) {
  const [assignedVisible, setAssignedVisible] = React.useState<boolean>(false);

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div className="w-[40rem] flex gap-x-5  pl-10 p-2 items-center">
          <span className="font-poppins text-[1rem] font-bold text-center">
            Gig Details
          </span>
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
              src={gig?.postedBy.profilePic.url}
              alt="profile"
              className="w-[5rem] h-[5rem] rounded-full"
            />
            <span
              className="text-orange hover:underline font-poppins text-xs cursor-pointer"
              onClick={() => {
                setAssignedVisible(true);
              }}
            >
              View
            </span>
          </div>
          <div className="flex flex-col gap-y-1 w-[85%]">
            <span className="font-poppins text-lg font-bold">
              {gig?.postedBy.username}
            </span>
            <span className="font-poppins text-sm">{gig?.postedBy.email}</span>
            <span className="font-poppins text-sm">
              {gig?.postedBy.phoneNumber}
            </span>
            <span className="font-poppins text-sm font-bold">{gig?.title}</span>
            <div className="flex flex-row">
              {gig?.images?.map((i:any, index: number) => (
                <img
                  key={index}
                  src={i?.url}
                  alt="skill"
                  className="w-[9rem] h-[7rem]"
                />
              ))}
            </div>
            <div>
              <p className="font-poppins text-xs bg-slate-100 rounded-md h-[9rem] p-4 overflow-y-scroll">
                {parse(gig?.gig_description)}
              </p>
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
            <UserModal
              singleFreelancer={gig?.postedBy}
              props={setAssignedVisible}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GigModal;
