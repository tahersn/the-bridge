import React from "react";
function Banner() {
  return (
    <div className="h-full w-full flex items-center justify-center relative ">
      <div className="w-full relative">
        <img
          src="https://www.industriousoffice.com/wp-content/uploads/2023/02/Pillar_Hero_What-is-coworking.jpg"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
        <div className="w-full h-full bg-gray-900/60 absolute inset-0"></div>
      </div>
      <div className="bg-slate-50/80 absolute h-fit px-4 py-7 w-2/4 z-10 flex flex-col items-center justify-center ">
        <div className="px-4 ">
          <p className="font-bold text-4xl text-black z-10 text-center pb-2 opacity-100 mb-2">
            Improve your skills on your own to prepare for a better future
          </p>
        </div>
        <div>
          <button className="rounded-2xl  justify-center items-center px-4 py-1 bg-pink-700 text-white  text-xl">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
