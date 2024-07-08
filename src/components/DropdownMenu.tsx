"use client";
import {Icon} from "@iconify/react/dist/iconify.js";
import React, {useState, useEffect, useRef} from "react";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Explicitly typing useRef

  // Function to handle toggling the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Effect to add event listener when component mounts
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 text-accent cursor-pointer transition-all duration-300 hover:bg-accent hover:text-white rounded-full">
        <Icon
          icon="akar-icons:more-horizontal"
          className="w-6 h-6  cursor-pointer"
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-primary border border-accent shadow-lg rounded-md z-10">
          <div className="py-1">
            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent focus:outline-none">
              Option 1
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent focus:outline-none">
              Option 2
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent focus:outline-none">
              Option 3
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
