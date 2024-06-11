import React from "react";
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";
import { IoMdRefreshCircle } from "react-icons/io";
import { PaymentStore } from "../helper/PaymentStore";
import PaymentModal from "../components/PaymentModal";

interface OptionValue {
  value: string;
  label: string;
}

const options: OptionValue[] = [
  { value: "", label: "All" },
  { value: "provider_paid", label: "Job Provider paid" },
  { value: "request_payment", label: "Freelancer requested" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

function Payment() {
  const [modalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [totalPayments, setTotalPayments] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);
  const [singlePayment, setSinglePayment] = React.useState<any>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const [selectedOption, setSelectedOption] = React.useState<OptionValue>({
    value: "",
    label: "All",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLoading(true);
    setTotalPayments(0);
    const selectedValue = event.target.value;
    const option = options.find((option) => option.value === selectedValue);

    if (option) {
      setSelectedOption(option);
    } else {
      setSelectedOption({ value: "", label: "All" });
    }
  };

  const getallPayments = async () => {
    setLoading(true);
    console.log("hitted", selectedOption.value, isChecked);
    const response = await (PaymentStore.getState() as any).getPayments(
      selectedOption.value,
      isChecked,
      1,
      5
    );
    setTotalPayments(response.totalPayments);
    setPayments(response.payments);
    setLoading(false);
    setSelectLoading(false);
  };

  React.useEffect(() => {
    getallPayments();
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
                {selectLoading ? "Loading ..." : selectedOption.label} Payments
                -
                <span className="text-[1rem] text-orange">
                  {" "}
                  {loading ? "Loading..." : ` (${totalPayments})`}
                </span>
              </span>
              <div
                className="mr-28 cursor-pointer"
                onClick={() => getallPayments()}
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
                  Select Payment type
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
                  Recent Payment
                </label>
              </div>

              <span
                className="px-4 py-1 ml-5 cursor-pointer bg-orange text-white font-poppins rounded-md"
                onClick={() => getallPayments()}
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
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Job Provider
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Freelancer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount with charges (5%)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pay to
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only text-orange">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr className="border-b hover:bg-gray-50" key={payment.id}>
                      {payment?.paymentStatus === "provider_paid" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-red-600 px-3 rounded-md border-[2px] border-red-400 py-1">
                            not requested
                          </span>
                        </th>
                      )}
                      {payment?.paymentStatus === "request_payment" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-purple-600 px-3 rounded-md border-[2px] border-purple-400 py-1">
                            requested
                          </span>
                        </th>
                      )}
                      {payment?.paymentStatus === "Completed" && (
                        <th
                          scope="row"
                          className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-white bg-green-600 px-3 rounded-md border-[2px] border-green-400 py-1">
                            paid
                          </span>
                        </th>
                      )}
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {payment?.PaymentBy.username}
                      </th>
                      <td className="px-6 py-4">
                        {payment?.PaymentTo.username}
                      </td>
                      <td className="px-6 py-4">Rs.{payment?.amount}/-</td>
                      {payment?.paymentType !== "cash" ?(
                        <td className="px-6 py-4">
                          Rs.{payment?.amount - (payment?.amount * 5) / 100}/-
                        </td>
                      ):(
                        <td className="px-6 py-4">
                          Rs.{payment?.amount}/- (Offline)
                        </td>
                      )}

                      <td className="px-6 py-4">
                        {payment?.PaymentTo.username}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          onClick={() => {
                            setIsmodalVisible(true);
                            setSinglePayment(payment);
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
              <PaymentModal
                props={setIsmodalVisible}
                singlePayment={singlePayment}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
