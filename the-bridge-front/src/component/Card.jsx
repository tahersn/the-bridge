import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import products from "../assets/products.js";
import AddModal from "./Modals/AddModal.jsx";
import UpdateModal from "./Modals/UpdateModal.jsx";

import api from "../api";

function Card() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteCourse = (id) => {
    alert("Are you sure you want to delete this course?");
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    api
      .delete(`/courses/${id}`)
      .then((res) => {
        console.log(res);
        setCourses(courses.filter((course) => course._id !== id));
      })
      .catch((err) => console.log(err));

  };

  const handleAdd = (course) => {
    setCourses([...courses, course]);
  }

  const handleUpdate = (course) => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  }

  return (
    <div className="p-6">
      {isAdminRoute && <AddModal onAdd={handleAdd} />}
      <div className="flex flex-wrap -mx-2 my-2 ">
        {courses.map((p, index) => (
          <div key={index} className="px-2 my-2 w-full sm:w-1/3 ">
            <div className="hover:scale-105 duration-200 hover:shadow-xl bg-white">
              <div className="h-fit flex flex-col mb-3">
                <img
                  src={`http://localhost:3000/${p.image}`}
                  className="h-[220px] object-cover w-full "
                  alt={p.name}
                />
              </div>
              <div className="flex flex-col py-2 px-4">
                <div className="text-black text-3xl font-extrabold">
                  {p.name}
                </div>
                <div className="text-pink-800 text-2xl px-2 mt-2">
                  {p.price} DT/Month
                </div>
                {isAdminRoute && (
                  <div className="flex mt-2">
                    <UpdateModal onUpdate={handleUpdate} initialData={p}  />
                 
                    <button
                      className="bg-red-400 hover:bg-red-500 duration-200 text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        deleteCourse(p._id);
                      }}
                    >
                      Delete
                    </button>
                      

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
