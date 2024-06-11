import React from "react";
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";
import { ReportStore } from "../helper/ReportStore";
import ActivatedModal from "../components/ActivatedModal";

function Deactivated() {
  const [users, setUsers] = React.useState<any>([]);
  const [ismodalVisible, setIsmodalVisible] = React.useState<boolean>(false);
  const [singleUser, setSingleUser] = React.useState<any>({});

  const getAllDeactivatedUsers = async () => {
    const response = await (
      ReportStore.getState() as any
    ).getAllDeactivatedUsers();
    setUsers(response.users);
  };

  React.useEffect(() => {
    getAllDeactivatedUsers();
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
          <span className="font-poppins text-md ">Deactivated Accounts</span>
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
                {users?.map((user: any) => (
                  <tr className="border-b hover:bg-gray-50" key={user._id}>
                    {user?.isDocumentVerified === "Pending" && (
                      <th
                        scope="row"
                        className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-white bg-yellow-600 px-3 rounded-md border-[2px] border-yellow-400 py-1">
                          Pending
                        </span>
                      </th>
                    )}
                    {user?.isDocumentVerified === "is_not_verified" && (
                      <th
                        scope="row"
                        className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-white bg-red-600 px-3 rounded-md border-[2px] border-red-400 py-1">
                          not verified
                        </span>
                      </th>
                    )}
                    {user?.isDocumentVerified === "verified" && (
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
                      {user?.username}
                    </th>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">
                      {user?.phoneNumber || "Not verified"}
                    </td>
                    <td className="px-6 py-4">
                      {user?.location || "Not added"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        onClick={() => {
                          setIsmodalVisible(true);
                          setSingleUser(user);
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
        {/* view  */}
        {ismodalVisible && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <ActivatedModal
                props={setIsmodalVisible}
                singleUser={singleUser}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deactivated;
