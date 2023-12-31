import React from 'react'
import Banner from "../component/layers/Banner";
import products from "../assets/products";
import Footer from "../component/layers/Footer";
import Card from '../component/Card';

function Home() {
  return (
    <>
    <div className="h-[100vh] py-6">
    <Banner />
  </div>
  <div className="py-2 px-6 flex flex-col">
    <div className="w-full h-[100px] flex justify-between items-center my-10 px-12">
      <div>
        <p className="font-bold text-black text-5xl ">Discover Courses</p>
      </div>
      <button className="rounded-3xl  justify-center items-center h-fit px-5 py-1 bg-pink-700 hover:bg-pink-800 transition:1s-ease-in-out text-white  text-xl">
        View More
      </button>
    </div>
   <Card/>
  </div>
  <div className="flex justify-center px-16 lg:px-64 py-9 w-full">
    <Footer/>
  </div>
  </>
  )
}

export default Home