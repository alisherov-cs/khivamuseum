

import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex py-[75px] justify-center">
      <div className="w-full mx-[5%] flex shadow-[4px_4px_58px_0px_rgba(34,60,80,0.2)] min-h-[450px] h-max max-h-[2000px] bg-white rounded-lg">
        <div className="lg:w-[75%] w-full p-7">
          <h1 className="text-3xl font-medium">Личные данные</h1>
          <form className="mt-7 flex gap-y-5 flex-wrap">
            <div className="flex md:w-1/2 w-full pr-4 flex-col gap-y-2 relative">

              <label className="text-base" htmlFor="name">
                Name
              </label>
                <input type="text" name="" className="py-3 px-4 border rounded-xl" value={"Name"} id="" />
                <span className="absolute bottom-[15%] right-[7.5%] cursor-pointer text-lg"><i className="fa-regular fa-copy"></i></span>
            </div>
            <div className="flex md:w-1/2 w-full pr-4 flex-col gap-y-2 relative">

              <label className="text-base" htmlFor="name">
                Name
              </label>
                <input type="text" name="" className="py-3 px-4 border rounded-xl" value={"Name"} id="" />
                <span className="absolute bottom-[15%] right-[7.5%] cursor-pointer text-lg"><i className="fa-regular fa-copy"></i></span>
            </div>
            <div className="flex md:w-1/2 w-full pr-4 flex-col gap-y-2 relative">

              <label className="text-base" htmlFor="name">
                Name
              </label>
                <input type="text" name="" className="py-3 px-4 border rounded-xl" value={"Name"} id="" />
                <span className="absolute bottom-[15%] right-[7.5%] cursor-pointer text-lg"><i className="fa-regular fa-copy"></i></span>
            </div>
            <div className="flex md:w-1/2 w-full pr-4 flex-col gap-y-2 relative">

              <label className="text-base" htmlFor="name">
                Name
              </label>
                <input type="text" name="" className="py-3 px-4 border rounded-xl" value={"Name"} id="" />
                <span className="absolute bottom-[15%] right-[7.5%] cursor-pointer text-lg"><i className="fa-regular fa-copy"></i></span>
            </div>
            <button className="py-3 mt-5 px-4 text-base hover:opacity-90 duration-300 font-semibold text-white bg-[#3498DB]  rounded-xl">Сохранить изменения</button>
          </form>
        </div>
        <div className="border-l-[1px] hidden lg:flex flex-col  w-[25%]">
          <div className="flex flex-col p-4 gap-y-4">
            <NavLink
              to="/profile/info"
              className={({ isActive }) =>
                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                  isActive
                    ? "bg-[#3498DB] text-white"
                    : "bg-white hover:bg-[#3498DB]"
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/profile/pending"
              className={({ isActive }) =>
                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                  isActive
                    ? "bg-[#3498DB] text-white"
                    : "bg-white hover:bg-[#3498DB]"
                }`
              }
            >
              Pending
            </NavLink>
            <NavLink
              to="/profile/paid"
              className={({ isActive }) =>
                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                  isActive
                    ? "bg-[#3498DB] text-white"
                    : "bg-white hover:bg-[#3498DB]"
                }`
              }
            >
              Paid
            </NavLink>
            <NavLink
              to="/profile/history"
              className={({ isActive }) =>
                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                  isActive
                    ? "bg-[#3498DB] text-white"
                    : "bg-white hover:bg-[#3498DB]"
                }`
              }
            >
              History
            </NavLink>

          </div>
          <div className="flex items-center justify-between hover:bg-gray-100 duration-200 mt-auto py-3 px-8 border-t-[1px]">
            <span>LogOut</span>
            <span className="fa-regular fa-right-to-bracket"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
