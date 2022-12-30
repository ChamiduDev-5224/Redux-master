import React from "react";
import NotFoundSvg from "../assets/img/404.svg";
function NotFound() {
  return (
    <div className="flex flex-col justify-center">
      <div className=" px-5 text-center text-zinc-300 font-extrabold text-[46px] pt-48 overflow-hidden">
        404 Not Found
      </div>
      <div>
        <img
          src={NotFoundSvg}
          alt={NotFoundSvg}
          className="w-40 mx-auto my-auto"
        />
      </div>
    </div>
  );
}

export default NotFound;
