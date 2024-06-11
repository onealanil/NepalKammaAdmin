import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FreelancerStore } from "../helper/FreelancerStore";

function UserModal({ props, singleFreelancer, functionHandler }: any) {
  const [isPhotoVisible, setIsPhotoVisible] = React.useState<boolean>(false);
  const [photo, setPhoto] = React.useState<string>("");

  const verfiyHandler = async () => {
    try {
      const response = await (FreelancerStore.getState() as any).verifyUser(
        singleFreelancer._id
      );
      functionHandler();
      alert(response.message);
      props(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const rejectHandler = async () => {
    try {
      const response = await (FreelancerStore.getState() as any).rejectUser(
        singleFreelancer._id
      );
      functionHandler();
      alert(response.message);
      props(false);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <div className="w-[40rem] pl-10 p-2 items-center">
            <span className="font-poppins text-[1rem] font-bold text-center">
              {singleFreelancer?.username} ({singleFreelancer?.role})
            </span>
            {singleFreelancer?.role === "job_provider" && (
              <span className="text-orange ml-5  px-3 rounded-md border-[2px] py-1">
                Level: {singleFreelancer?.mileStone}
              </span>
            )}
            {singleFreelancer?.isDocumentVerified === "verified" && (
              <span className="text-orange ml-5  px-3 rounded-md border-[2px] py-1">
                verified
              </span>
            )}
            {singleFreelancer?.userAccountStatus === "Active" && (
              <span className="text-orange ml-5  px-3 rounded-md border-[2px] py-1">
                Active
              </span>
            )}
            {singleFreelancer?.userAccountStatus === "Deactivated" && (
              <span className="text-red-500 ml-5  px-3 rounded-md border-[2px] py-1">
                Deactivated
              </span>
            )}
          </div>
          <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
            <AiOutlineClose
              size={30}
              className="text-red-900 block cursor-pointer"
            />
          </i>
        </div>
        {/* body start  */}
        <div className="p-4 flex flex-col gap-y-4">
          {/* top start */}
          <div className="flex gap-x-5">
            {/* profile picture */}
            <div className="flex flex-col gap-y-2 items-center w-[12%]">
              <img
                src={singleFreelancer?.profilePic?.url}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />
              <span className="text-xs font-poppins text-orange ">Male</span>
            </div>
            {/* other information */}
            <div className="flex flex-col gap-y-1 w-[28%]">
              <span className="font-poppins text-sm font-bold">
                {singleFreelancer?.email}
              </span>
              <span className="font-poppins text-sm font-bold">
                {singleFreelancer?.phoneNumber || "Number not verified"}
              </span>
              <span className="font-poppins text-xs">
                {singleFreelancer?.location}
              </span>
              <span className="font-poppins text-xs text-orange">
                {singleFreelancer?.title}
              </span>
              <div className="flex gap-x-2 overflow-x-scroll mt-2">
                {singleFreelancer?.skills.map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-4 py-2 bg-slate-100 font-poppins text-orange "
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            {/* bio and about me section  */}
            <div className="w-[60%]">
              <div>
                <p className="font-poppins text-xs bg-slate-100 rounded-md h-[9rem] p-4 overflow-y-scroll">
                  {singleFreelancer?.about_me}
                </p>
              </div>
            </div>
          </div>
          {/* top end  */}
          {/* bottom start */}
          <div className="mt-3">
            <span className="font-poppins font-semibold">Documents</span>
            <div className="w-[100%] flex gap-x-5 items-center justify-center">
              {/* doc-1  */}
              {singleFreelancer?.documents?.map((doc: any, index: number) => (
                <div className="flex flex-col gap-y-2">
                  <span className="font-poppins text-sm">
                    Photo - {index + 1}
                  </span>
                  <img
                    src={doc.url}
                    //src="https://corporatelawyernepal.com/wp-content/uploads/2022/07/citizenship.jpg"
                    alt="citizenship"
                    className="w-full h-40 cursor-pointer"
                    onClick={() => {
                      setIsPhotoVisible(true);
                      setPhoto(doc.url);
                      // setPhoto(
                      //   "https://corporatelawyernepal.com/wp-content/uploads/2022/07/citizenship.jpg"
                      // );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* bottom end  */}
          {/* buttoms */}
          {singleFreelancer?.isDocumentVerified === "Pending" && (
            <div className="w-full flex items-center justify-center gap-x-8">
              <span
                className="px-6 py-2 font-poppins bg-orange text-white rounded-md cursor-pointer"
                onClick={verfiyHandler}
              >
                Verify
              </span>
              <span
                className="px-6 py-2 font-poppins bg-red-500 text-white rounded-md cursor-pointer"
                onClick={rejectHandler}
              >
                Reject
              </span>
            </div>
          )}
        </div>
        {/* body end  */}

        {isPhotoVisible && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="pl-10 p-2 items-center">
                    <span className="font-poppins text-[1rem] font-bold text-center">
                      {singleFreelancer?.username} ({singleFreelancer?.role})
                    </span>
                  </div>
                  <i
                    className="p-1 ml-auto float-right"
                    onClick={() => setIsPhotoVisible(false)}
                  >
                    <AiOutlineClose
                      size={30}
                      className="text-red-900 block cursor-pointer"
                    />
                  </i>
                </div>
                <img src={photo} alt="citizenship" className="w-full h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserModal;
