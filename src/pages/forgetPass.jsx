import { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { PiCodeSimpleBold } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";

export default function ForgetPass() {

    const [isOtpVarify, setIsOtpVarify] = useState(false);
    const [isVarify, setIsVarify] = useState(false);
    const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        {!isVarify && <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forget Password</h1>
          </div>
          <form className="space-y-4">
            <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                Contact No
              </label>
              <div className="relative">
                <input
                  type="contact"
                  placeholder="Enter your number"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                <BsTelephone className="text-gray-500 h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg"
              >
                Send OTP
              </button>
              </div>
            </form>
          {isOtpVarify && <form className="space-y-4">
            <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                OTP
              </label>
              <div className="relative">
                <input
                  type="contact"
                  placeholder="Enter your OTP"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                <PiCodeSimpleBold  className="text-gray-500 h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg"
              >
                Submit
              </button>
              </div>
            </form>}
        </div>}
        {isVarify && <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
          </div>
          <form className="space-y-4">
            <div>
            <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enre new password"
                      className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-3.5">
                    {!showPass && (
                  <FaRegEye className="text-gray-500 h-5 w-5 cursor-pointer" 
                    onClick={() => {
                      setShowPass(!showPass);
                    }}/>
                )}
                {showPass && (
                  <FaRegEyeSlash className="text-gray-500 h-5 w-5 cursor-pointer"  
                  onClick={() => {
                    setShowPass(!showPass);
                  }}/>
                )}
                </span>
                  </div>
            </div>
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg"
              >
                Reset
              </button>
              </div>
            </form>
        </div>}
      </div>
    </div>
  );
}
