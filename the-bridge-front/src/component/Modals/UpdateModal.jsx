import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

import api from "../../api";

function UpdateModal({ onUpdate, courseId, initialData }) {
  let [isOpen, setIsOpen] = useState(false);
    const [selectedfile, setSelectedfile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("image", initialData.image);
    }
  }, [initialData, setValue]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedfile(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageUrl(reader.result);
        setValue("image", file)
      } else {
        setImage(null);
        setImageUrl("");
        alert("Please upload a valid image file");
      }
    };
    reader.readAsDataURL(selectedfile);
    console.log(reader.readAsDataURL(selectedfile));
  };


  function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
    api
      .patch(`/courses/${initialData._id}`, formData)
      .then((res) => {
        console.log(res);
        onUpdate(res.data);
        console.log(imageUrl);
        closeModal();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-yellow-500 hover:bg-yellow-600 duration-200 text-white px-4 mr-1 py-2 text-sm"
      >
        Update Course
      </button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-gray-800">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Update Course
          </Dialog.Title>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
              
              <img src={imageUrl? imageUrl: `http://localhost:3000/${initialData.image}`} alt="Preview" className="mt-2 w-32 h-32 object-cover" />                    
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Course name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Course name"
                    autoComplete="name"
                    className="text-gray-800 px-4 py-2 rounded-md bg-gray-100 focus:bg-gray-200 focus:outline-none w-full"
                    onChange={(e) => setValue("name", e.target.value)}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Price
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    autoComplete="price"
                    className="text-gray-800 px-4 py-2 rounded-md bg-gray-100 focus:bg-gray-200 focus:outline-none w-full"
                    onChange={(e) => setValue("price", e.target.value)}
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div>
            
                <label
                    htmlFor="image"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Image
                </label>
                <div className="mt-1">
                    <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Image"
                    autoComplete="image"
                    className="text-gray-800 px-4 py-2 rounded-md bg-gray-100 focus:bg-gray-200 focus:outline-none w-full"
                    onChange={(e)=>handleImageChange(e)}
                    {...register("image")}
                    />
                    {errors.image && (
                    <span className="text-red-500">This field is required</span>
                    )}
                </div>
                </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </Modal>
    </>
  );
}

export default UpdateModal;
