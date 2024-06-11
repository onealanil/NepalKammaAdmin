import React from "react";
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";
import { IoMdRefreshCircle } from "react-icons/io";
import { ReportStore } from "../helper/ReportStore";
import ReportModal from "../components/ReportModal";

interface OptionValue {
  value: string;
  label: string;
}

const options: OptionValue[] = [
  { value: "", label: "All" },
  { value: "freelancer_reported", label: "Report by freelancer" },
  { value: "job_provider_reported", label: "Report by job Provider" },
];

function Reports() {
  const [modalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [reports, setReports] = React.useState<any[]>([]);
  const [singleReport, setSingleReport] = React.useState<any>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

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

  const getAllReports = async () => {
    console.log("hitted", selectedOption.value, isChecked);
    setLoading(true);
    const response = await (ReportStore.getState() as any).getAllReport(
      isChecked
    );
    setReports(response.reports);
    setLoading(false);
  };

  React.useEffect(() => {
    getAllReports();
  }, []);

  return (
    <div className="w-[100%] h-screen flex flex-col">
      <div className="py-8">
        <Header />
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-[20%] sticky top-0 h-full overflow-y-auto">
          <LeftSide />
        </div>
        <div className="w-[80%] overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold">
                {/* {selectLoading ? "Loading ..." : selectedOption.label} Payments */}
                -
                <span className="text-[1rem] text-orange">
                  {" "}
                  {/* {loading ? "Loading..." : ` (${totalPayments})`} */}
                </span>
              </span>
              <div
                className="mr-28 cursor-pointer"
                onClick={() => getAllReports()}
              >
                <IoMdRefreshCircle size={25} color="green" />
              </div>
            </div>
            {/* filter start */}
            <div className="flex items-end gap-x-3 ">
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
                  Recent Reports
                </label>
              </div>

              <span
                className="px-4 py-1 ml-5 cursor-pointer bg-orange text-white font-poppins rounded-md"
                onClick={() => getAllReports()}
              >
                {loading ? "Applying..." : "Apply"}
              </span>
            </div>

            {/* filter end  */}
            {/* table start */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[44.5rem] overflow-y-scroll">
              <table className="w-[95%] text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ReportedBy
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ReportedTo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Report
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.map((report) => (
                    <tr className="border-b hover:bg-gray-50" key={report._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {report?.reportedBy.username}
                      </th>
                      <td className="px-6 py-4">
                        {report?.reportedTo.username}
                      </td>
                      <td className="px-6 py-4">{report?.report}</td>

                      <td className="px-6 py-4">{report?.createdAt}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                           onClick={() => {
                             setIsmodalVisible(true);
                             setSingleReport(report);
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
              <ReportModal
                props={setIsmodalVisible}
                singleReport={singleReport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
