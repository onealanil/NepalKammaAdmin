import React from "react";
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";
import { IoMdRefreshCircle } from "react-icons/io";
import UserModal from "../components/UserModal";
import { JobProviderStore } from "../helper/JobProviderStore";

interface OptionValue {
  value: string;
  label: string;
}

const options: OptionValue[] = [
  { value: "", label: "All" },
  { value: "verified", label: "Verified" },
  { value: "is_not_verified", label: "Non-Verified" },
  { value: "Pending", label: "Pending" },
];

function JobProviders() {
  const [modalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [buyers, setBuyers] = React.useState<any[]>([]);
  const [singleBuyer, setSingleBuyer] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [totalBuyers, setTotalBuyers] = React.useState<number>(0);
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const [selectedOption, setSelectedOption] = React.useState<OptionValue>({
    value: "",
    label: "All",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLoading(true);
    setTotalBuyers(0);
    const selectedValue = event.target.value;
    const option = options.find((option) => option.value === selectedValue);

    if (option) {
      setSelectedOption(option);
    } else {
      setSelectedOption({ value: "", label: "All" });
    }
  };

  const getJobProviderHandler = async () => {
    setIsLoading(true);
    const response = await (JobProviderStore.getState() as any).getJobProvider(
      selectedOption.value,
      isChecked,
      1,
      5
    );
    setBuyers(response.users);
    setTotalBuyers(response.totalUsers);
    setIsLoading(false);
    setSelectLoading(false);
  };

  React.useEffect(() => {
    getJobProviderHandler();
  }, []);

  const refreshHandler = () => {
    getJobProviderHandler();
  };

  return (
    <div className="w-[100%] h-screen flex flex-col">
      <div className="py-8">
        <Header />
      </div>
      <div className=" flex flex-grow overflow-hidden">
        <div className="w-[20%] sticky top-0 h-full overflow-y-auto">
          <LeftSide />
        </div>
        <div className="w-[80%] overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold">
                {selectLoading ? "Loading ..." : selectedOption.label} Job
                Providers -
                <span className="text-[1rem] text-orange">
                  {" "}
                  {isLoading ? "Loading..." : ` (${totalBuyers})`}
                </span>
              </span>
              <div className="mr-28 cursor-pointer" onClick={refreshHandler}>
                <IoMdRefreshCircle size={25} color="green" />
              </div>
            </div>
            {/* filter start */}
            <div className="flex items-end gap-x-3 ">
              <span></span>
              <form className="w-[15rem]">
                <label
                  htmlFor="types"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select job provider
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

              {/* check box  */}
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-black font-poppins"
                >
                  Recently Joined
                </label>
              </div>

              <span
                className="px-4 py-1 ml-5 cursor-pointer bg-orange text-white font-poppins rounded-md"
                onClick={() => getJobProviderHandler()}
              >
                Apply
              </span>
            </div>

            {/* filter end  */}
            {/* table start */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[44.5rem] overflow-y-scroll">
              <table className="w-[95%] text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Document Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only text-orange">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyers?.map((buyer) => (
                    <tr className="border-b hover:bg-gray-50" key={buyer._id}>
                      {buyer?.isDocumentVerified === "Pending" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-yellow-600 px-3 rounded-md border-[2px] border-yellow-400 py-1">
                            Pending
                          </span>
                        </th>
                      )}
                      {buyer?.isDocumentVerified === "is_not_verified" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-red-600 px-3 rounded-md border-[2px] border-red-400 py-1">
                            not verified
                          </span>
                        </th>
                      )}
                      {buyer?.isDocumentVerified === "verified" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-green-600 px-3 rounded-md border-[2px] border-green-400 py-1">
                            verified
                          </span>
                        </th>
                      )}

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {buyer?.username}
                      </th>
                      <td className="px-6 py-4">{buyer?.email}</td>
                      <td className="px-6 py-4">
                        {buyer?.phoneNumber || "Not verified"}
                      </td>
                      <td className="px-6 py-4">
                        {buyer?.location || "Not added"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          onClick={() => {
                            setIsmodalVisible(true);
                            setSingleBuyer(buyer);
                          }}
                          className="font-medium text-orange hover:underline cursor-pointer"
                        >
                          View
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* table end  */}
          </div>
        </div>

        {/* view  */}
        {modalVisible && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <UserModal
                singleFreelancer={singleBuyer}
                props={setIsmodalVisible}
                functionHandler={getJobProviderHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobProviders;
