import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoginStore } from "./helper/LoginStore";
import { useGlobalStore } from "../../config/Store";

interface LoginDetails {
  email: string;
  password: string;
}

interface LoginStoreState {
  loginUser: (values: LoginDetails) => Promise<any>;
}

const Login = () => {
  const navigate = useNavigate();
  const toastId = useRef(null);

  const setUser = useGlobalStore((state: any) => state.setUser);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  //handle login function
  const handleLogin = async (e: any) => {
    setLoginLoading(true);
    try {
      e.preventDefault();
      const loginData: LoginDetails = {
        email,
        password,
      };

      const response = await (
        LoginStore.getState() as LoginStoreState
      ).loginUser(loginData);

      if (response.status === "success") {
        localStorage.setItem("currentUser", response.token);
        setUser(response.user);
        navigate("/home");
      }
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace("[Error: ", "")
        .replace("]", "");
      //   ErrorToast(errorMessage);
      console.log(error);
    }
    setLoginLoading(false);
  };

  return (
    <>
      <div className="bg-white fixed inset-0 flex items-center justify-center mt-1 md:mt-5 select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5 items-center justify-center">
          <div className="w-full flex flex-col md:w-[50%] gap-y-3 p-4">
            <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
              <img
                src="/images/NepalKamma.png"
                alt="logo"
                className="w-[14rem]"
              />
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-y-2">
              <span className="text-[1rem] md:text-[1.5rem] font-black leading-relaxed tracking-wide">
                Login to your account
              </span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="w-full flex flex-col items-center juistify-center mt-5 gap-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />

                {/* for password  */}
                <div className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEye className="h-5 w-5" />
                    ) : (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] font-poppins text-sm leading-relaxed px-4 py-2 cursor-pointer bg-orange text-white rounded-md text-center mt-2"
                >
                  {loginLoading ? "Loggin In..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
