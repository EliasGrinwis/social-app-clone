"use client";
import Image from "next/image";
import React, {useState} from "react";

export default function Modal({
  title,
  text,
  data,
}: {
  title: string;
  text: string;
  data?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={toggleModal}
        className="text-md text-white hover:text-gray-300 transition-all duration-300"
        type="button">
        {text}
      </button>

      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-primary  rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                {data.length === 0 && (
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold text-white">
                      No likes available
                    </h1>
                    <p className="text-md text-accent">
                      There are currently no likes for this post.
                    </p>
                  </div>
                )}
                {data?.map((postLike: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        className="w-14 h-14 rounded-full dark:border-gray-800"
                        src={postLike.userimage}
                        alt={postLike.username}
                      />
                      <div>
                        <h2 className="text-white text-lg">
                          {postLike.username}
                        </h2>
                        <p className="text-accent text-md">
                          {postLike.useremail}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-lightGray hover:bg-accent transition-all duration-300 px-6 py-2 rounded-lg text-white">
                        Volgen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
