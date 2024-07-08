"use client";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      id="cta-button-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-lightGray"
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary">
        <h1 className="p-2 text-white font-bold text-3xl mb-5">Snapgram</h1>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/" ? "bg-purple" : ""
              }`}>
              <Icon icon="material-symbols:home-rounded" className="w-7 h-7" />
              <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/explore" ? "bg-purple" : ""
              }`}>
              <Icon icon="material-symbols:explore" className="w-7 h-7" />
              <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
            </Link>
          </li>
          <li>
            <Link
              href="/people"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/people" ? "bg-purple" : ""
              }`}>
              <Icon
                icon="material-symbols:group-outline-rounded"
                className="w-7 h-7"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">People</span>
            </Link>
          </li>
          <li>
            <Link
              href="/saved"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/saved" ? "bg-purple" : ""
              }`}>
              <Icon icon="material-symbols:bookmark" className="w-7 h-7" />
              <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
            </Link>
          </li>
          <li>
            <Link
              href="/post/create"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/post/create" ? "bg-purple" : ""
              }`}>
              <Icon
                icon="material-symbols:add-box-outline-rounded"
                className="w-7 h-7"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Create Post</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={`flex items-center p-2 font-semibold rounded-lg text-white hover:bg-lightPurple group ${
                pathname === "/profile" ? "bg-purple" : ""
              }`}>
              <Icon icon="material-symbols:person" className="w-7 h-7" />
              <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
          <li
            className="w-full hover:bg-lightPurple font-semibold rounded-lg text-white  group cursor-pointer"
            onClick={() => signOut()}>
            <button
              className={`flex items-center p-2  ${
                pathname === "/logout" ? "bg-purple" : ""
              }`}>
              <Icon icon="material-symbols:logout" className="w-7 h-7" />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
