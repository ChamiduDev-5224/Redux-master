import React from "react";
import { CiDark } from "react-icons/ci";
import Store from "../redux/store/Store";
import { AddTask, UpdateTask } from "../redux/action/Action";
import { theme } from "../context/Theme";
function Header({ loggedUser }) {
  const [isToggled, setIsToggled] = React.useState(false);
  sessionStorage.setItem("isDark", isToggled);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className="haeder flex flex-row p-10 content-baseline ">
      <div className="w-[150px] md:w-[250px]">
        {loggedUser && (
          <span className="text-teal-50 text-[12px]">
            <span className="text-[16px] md:text-[20px]">Hi</span> {loggedUser}
          </span>
        )}
      </div>
      <div className="justify-end ml-40  mx-auto md:ml-[60rem]">
        <label class="relative items-center cursor-pointer md:inline-flex ">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            defaultChecked={isToggled}
            onClick={handleToggle}
          />
          <div class="hidden w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 md:inline-block" />
          <span class=" right-0 text-sm font-medium text-cyan-50 border rounded-xl dark:text-gray-300 absolute  m-auto md:relative mt-0 ml-5 ">
            <CiDark size={20} width="40" />
          </span>
        </label>
      </div>
    </div>
  );
}

export default Header;
