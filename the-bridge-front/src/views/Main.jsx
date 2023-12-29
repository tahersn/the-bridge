import React from "react";
import NavLanding from "../component/layers/NavLanding";
import Banner from "../component/layers/Banner";
import products from "../assets/products";
import Footer from "../component/layers/Footer";

function Main() {
  return (
    <div className="h-full w-full">
      <div className="h-[80px] pt-2 pl-4 w-full bg-white">
        <NavLanding />
      </div>
      <div className="h-[100vh] py-6">
        <Banner />
      </div>
      <div className="py-2 px-6 flex flex-col">
        <div className="w-full h-[100px] flex justify-between items-center my-10 px-12">
          <div>
            <p className="font-bold text-black text-5xl ">Discover Corses</p>
          </div>
          <button className="rounded-3xl  justify-center items-center h-fit px-5 py-1 bg-pink-700 text-white  text-xl">
            View More
          </button>
        </div>
        <div className="flex flex-wrap -mx-2 my-2">
          {products.map((p, index) => (
            <div key={index} className="px-2 my-2 w-full sm:w-1/3">
              {" "}
              {/* Adjusted padding and width */}
              <div className="h-fit flex flex-col mb-3">
                {" "}
                {/* Added margin-bottom for spacing between rows */}
                <img
                  src={p.img}
                  className="h-[220px] object-cover w-full"
                  alt={p.title}
                />{" "}
                {/* Ensured w-full for images */}
              </div>
              <div className="flex flex-col py-2 px-4">
                <div className="text-black text-3xl font-extrabold ">
                  {p.name}
                </div>
                <div className="text-pink-800 text-2xl px-2 mt-2">
                  {p.price} DT/Month
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center px-16 lg:px-64 py-9 w-full">
        <Footer/>
      </div>
    </div>
  );
}

export default Main;
