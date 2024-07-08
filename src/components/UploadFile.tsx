"use client";

import Image from "next/image";
import {useState} from "react";
import Alert from "./Alert";
const UploadState = {
  IDLE: 1,
  UPLOADING: 2,
  UPLOADED: 3,
};
Object.freeze(UploadState);
export default function UploadFile({setPost}: any) {
  const [uploadState, setUploadState] = useState(UploadState.IDLE);
  const [imgUrl, setImgUrl] = useState("");
  async function handleFormData(e: any) {
    setUploadState(UploadState.UPLOADING);
    const file = e.target.files[0];

    // Check if the file is of a supported type
    if (file && !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      // Display an error message or handle the unsupported file type
      console.error(
        "Unsupported file type. Please select a PNG, JPG, or JPEG file."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImgUrl(data.secure_url);
    setPost((prev: any) => ({...prev, image: data.secure_url}));
    setUploadState(UploadState.UPLOADED);
  }
  return (
    <div className="flex justify-center items-center">
      {uploadState !== UploadState.UPLOADED ? (
        <div className="w-32">
          <label
            htmlFor="image"
            className="block cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center">
            {uploadState === UploadState.UPLOADING ? (
              <span>Uploading...</span>
            ) : (
              <span>Upload</span>
            )}
            <input
              type="file"
              name="file"
              id="image"
              className="hidden"
              accept=".png, .jpg, .jpeg"
              onChange={handleFormData}
            />
          </label>
        </div>
      ) : (
        <div className="text-green-500 ">
          <span className="block py-2 px-3 text-green-500 text-center">
            Uploaded!
          </span>
          <Image className="w-full" src={imgUrl} alt="Uploaded image" />
        </div>
      )}
    </div>
  );
}
