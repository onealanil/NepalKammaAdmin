import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import UserModal from "./UserModal";
import { ReportStore } from "../helper/ReportStore";

interface OptionValue {
  value: string;
  label: string;
}

const options: OptionValue[] = [
  { value: "", label: "All" },
  { value: "Deactivated", label: "Deactive" },
];

const ReportModal = ({ props, singleReport }: any) => {
  const [who, setWho] = React.useState<string>("");
  const [modalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [selectedOption, setSelectedOption] = React.useState<OptionValue>({
    value: "",
    label: "All",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const option = options.find((option) => option.value === selectedValue);

    if (option) {
      setSelectedOption(option);
    } else {
      setSelectedOption({ value: "", label: "All" });
    }
  };

  const handleReport = async () => {
    if (selectedOption.value === "Deactivated") {
      setIsLoading(true);
      try {
        const response = await (ReportStore.getState() as any).deactiveAccount(
          singleReport?.reportedTo?._id
        );
        if (response) {
          setIsLoading(false);
          alert("Report Confirmed Successfully");
        }
      } catch (error: any) {
        setIsLoading(false);
        alert(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div className="w-[40rem] pl-10 p-2 items-center">
          <span className="font-poppins text-[1rem] font-bold text-center">
            Report Details
          </span>
        </div>
        <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
          <AiOutlineClose
            size={30}
            className="text-red-900 block cursor-pointer"
          />
        </i>
      </div>
      {/* body starts */}
      <div>
        <div className="p-4 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-4 w-[90%] items-center justify-center">
              {/* user 1  */}
              <div className="flex flex-col items-center">
                {singleReport?.reportedBy.profilePic && (
                  <img
                    src={singleReport?.reportedBy.profilePic.url}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <span className="font-poppins ">
                  {singleReport?.reportedBy.username}
                </span>
                <span className="font-poppins text-xs">
                  ({singleReport?.reportedBy?.role})
                </span>
                <span
                  className="font-poppins text-xs text-orange hover:underline cursor-pointer"
                  onClick={() => {
                    setWho("reportedBy");
                    setIsmodalVisible(true);
                  }}
                >
                  View
                </span>
              </div>
              {/* arrow  */}
              <div>
                <FaArrowRightLong size={25} />
              </div>
              {/* user 2  */}
              <div className="flex flex-col items-center">
                {singleReport?.reportedTo.profilePic && (
                  <img
                    src={singleReport?.reportedTo.profilePic.url}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <span className="font-poppins ">
                  {singleReport?.reportedTo.username}
                </span>
                <span className="font-poppins text-xs">
                  ({singleReport?.reportedTo?.role})
                </span>
                <span
                  className="font-poppins text-xs text-orange hover:underline cursor-pointer"
                  onClick={() => {
                    setWho("reportedTo");
                    setIsmodalVisible(true);
                  }}
                >
                  View
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-10">
          <span className="font-poppins">Report Text:</span>
          <span className="font-poppins text-orange">
            {singleReport?.report}
          </span>
        </div>
        <div className="flex flex-col ml-10">
          <span>
            Want to deactivate {singleReport?.reportedTo?.username} account?
          </span>
        </div>
        <div className="flex flex-col ml-10">
          <form className="w-[15rem]">
            <label
              htmlFor="types"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Reports type
            </label>
            <select
              id="types"
              className="border  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 "
              value={selectedOption.value}
              onChange={handleChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </form>
          <div className="flex items-center justify-center gap-x-8">
            <span
              className="px-6 py-2 font-poppins bg-orange text-white rounded-md cursor-pointer"
              onClick={() => handleReport()}
            >
              {isLoading ? "Loading..." : "Confirm"}
            </span>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {who === "reportedBy" ? (
              <UserModal
                props={setIsmodalVisible}
                singleFreelancer={singleReport?.reportedBy}
              />
            ) : (
              <UserModal
                props={setIsmodalVisible}
                singleFreelancer={singleReport?.reportedTo}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportModal;
