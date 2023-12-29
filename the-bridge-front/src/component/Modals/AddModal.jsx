import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

import api from "../../api";

function AddModal({onAdd}) {
  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function onSubmit(data) {
    console.log(data, data.image[0].name);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image[0]);

    api
      .post("/courses", formData)
      .then((res) => {
        console.log(res);
        onAdd(res.data);
        closeModal();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="pb-6 flex items-end justify-end">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-emerald-500 hover:bg-emerald-600 duration-200 text-white px-4 py-2 text-sm "
        >
          Add Course
        </button>
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-gray-800">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Add Course
          </Dialog.Title>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
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
                    {...register("name", { required: true })}
                  />
                  {errors.title && (
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
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <span className="text-red-500">This field is required</span>
                  )}
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
                      accept="image/*"
                      name="image"
                      id="image"
                      placeholder="Image"
                      autoComplete="image"
                      className="text-gray-800 px-4 py-2 rounded-md bg-gray-100 focus:bg-gray-200 focus:outline-none w-full"
                      {...register("image", { required: true })}
                    />
                    {errors.image && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </Modal>
    </>
  );
}

export default AddModal;
