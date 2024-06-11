import React from "react";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import Header from "../components/Header";

function Home() {
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
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default Home;
