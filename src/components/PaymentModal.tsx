import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import UserModal from "./UserModal";
import JobModal from "./JobModal";
import { PaymentStore } from "../helper/PaymentStore";

function PaymentModal({
  props,
  singlePayment,
}: {
  props: any;
  singlePayment: any;
}) {
  const [modalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [isPhotoVisible, setIsPhotoVisible] = React.useState<boolean>(false);
  const [who, setWho] = React.useState<string>("");
  const [photo, setPhoto] = React.useState<string>("");
  const [jobModalVisible, setJobModalVisible] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const confirmPaymentHandler = async () => {
    setIsLoading(true);
    try {
      const response = await (PaymentStore.getState() as any).completedPayment(
        singlePayment?._id,
        singlePayment?.PaymentTo._id,
        singlePayment?.PaymentBy._id,
        singlePayment?.amount
      );
      if (response) {
        setIsLoading(false);
        alert("Payment Confirmed Successfully");
      }
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div className="w-[40rem] pl-10 p-2 items-center">
          <span className="font-poppins text-[1rem] font-bold text-center">
            Payment Details
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
                {singlePayment?.PaymentBy.profilePic && (
                  <img
                    src={singlePayment?.PaymentBy.profilePic.url}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <span className="font-poppins ">
                  {singlePayment?.PaymentBy.username}
                </span>
                <span className="font-poppins text-xs">(job Provider)</span>
                <span
                  className="font-poppins text-xs text-orange hover:underline cursor-pointer"
                  onClick={() => {
                    setWho("jobProvider");
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
                {singlePayment?.PaymentTo.profilePic && (
                  <img
                    src={singlePayment?.PaymentTo.profilePic.url}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <span className="font-poppins ">
                  {singlePayment?.PaymentTo.username}
                </span>
                <span className="font-poppins text-xs">(Freelancer)</span>
                <span
                  className="font-poppins text-xs text-orange hover:underline cursor-pointer"
                  onClick={() => {
                    setWho("freelancer");
                    setIsmodalVisible(true);
                  }}
                >
                  View
                </span>
              </div>
            </div>

            <div className="flex">
              {/* i  */}
              <div className="w-[50%]">
                <div className="flex gap-x-2">
                  <span className="font-poppins text-sm font-bold">
                    Amount :{" "}
                  </span>
                  <span className="font-poppins text-sm text-orange font-bold">
                    Rs. {singlePayment?.amount}/-
                  </span>
                </div>
                {singlePayment?.paymentType !== "cash" && (
                  <>
                    <div className="flex gap-x-2">
                      <span className="font-poppins text-sm font-bold">
                        Payment Number :{" "}
                      </span>
                      <span className="font-poppins text-sm text-orange font-bold">
                        {singlePayment?.recieverNumber}
                      </span>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="font-poppins text-sm font-bold">
                        Amount After (5%) Deduction :
                      </span>
                      <span className="font-poppins text-sm text-orange font-bold">
                        Rs.{" "}
                        {singlePayment?.amount -
                          (singlePayment?.amount * 5) / 100}
                        /-
                      </span>
                    </div>
                  </>
                )}
                {
                  singlePayment?.paymentType === "cash" && (
                    <div>
                      <span className="font-poppins text-orange font-bold">Offline Paid</span>
                    </div>
                  )
                }
              </div>
              {/* ii  */}
              <div className="flex gap-x-5">
                {/* doc-1  */}
                {singlePayment?.confirmation_image?.map(
                  (doc: any, index: number) => (
                    <div className="flex flex-col gap-y-2">
                      <span className="font-poppins text-sm">
                        Photo - {index + 1}
                      </span>
                      <img
                        src={doc.url}
                        alt="citizenship"
                        className="w-20 h-40 cursor-pointer"
                        onClick={() => {
                          setIsPhotoVisible(true);
                          setPhoto(doc.url);
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {/* job details  */}
        <div className="p-4 flex flex-col gap-y-4">
          <span
            className="font-poppins text-xs text-orange cursor-pointer hover:underline"
            onClick={() => setJobModalVisible(true)}
          >
            View Job Details
          </span>
        </div>
        {singlePayment?.paymentStatus === "request_payment" && (
          <div className="w-full flex items-center justify-center gap-x-8">
            <span
              className="px-6 py-2 font-poppins bg-orange text-white rounded-md cursor-pointer"
              onClick={() => confirmPaymentHandler()}
            >
              {isLoading ? "Loading..." : "Confirm"}
            </span>
            <span className="px-6 py-2 font-poppins bg-red-500 text-white rounded-md cursor-pointer">
              Reject
            </span>
          </div>
        )}
      </div>
      {/* body end  */}
      {/* view  */}
      {modalVisible && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {who === "jobProvider" ? (
              <UserModal
                props={setIsmodalVisible}
                singleFreelancer={singlePayment.PaymentBy}
              />
            ) : (
              <UserModal
                props={setIsmodalVisible}
                singleFreelancer={singlePayment.PaymentTo}
              />
            )}
          </div>
        </div>
      )}

      {jobModalVisible && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <JobModal
              job={singlePayment?.job}
              setIsmodalVisible={setJobModalVisible}
            />
          </div>
        </div>
      )}

      {isPhotoVisible && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[35rem] pb-5 z-50">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <div className=" pl-10 p-2 items-center">
                  <span className="font-poppins text-[1rem] font-bold text-center">
                    Confirmation Slip
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
  );
}

export default PaymentModal;
