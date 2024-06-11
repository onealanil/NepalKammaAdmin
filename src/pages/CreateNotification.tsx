import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import { FreelancerStore } from "../helper/FreelancerStore";

function CreateNotification() {
  const [message, setMessage] = React.useState<string>("");
  const sendNotificationHandler = async () => {
    try {
      if (message.trim() === "") {
        alert("Please enter notification message");
        return;
      }
      const response = await (
        FreelancerStore.getState() as any
      ).sendNotification(message);
      if (response) {
        alert("Notification sent successfully");
        setMessage("");
      } else {
        alert("Error occurred while sending notification");
      }
    } catch (error) {
      console.log("Error occurred while sending notification:", error);
      alert("Error occurred while sending notification");
    }
  };

  return (
    <div className="w-[100%] h-screen flex flex-col">
      <div className="py-8">
        <Header />
      </div>
      <div className="flex flex-grow  overflow-hidden">
        <div className="w-[20%] sticky top-0 h-full overflow-y-auto">
          <LeftSide />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>
            <span className="font-poppins text-sm">
              Create Notifications for All the Users
            </span>
          </div>
          <div>
            <textarea
              className="w-[100%] h-[100px] border border-gray-300 rounded-md p-2"
              placeholder="Enter Notification Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div
            className="flex items-center justify-center py-1 px-4 bg-orange text-white rounded-md cursor-pointer"
            onClick={sendNotificationHandler}
          >
            <span className="font-poppins">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNotification;
