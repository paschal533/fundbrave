"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import MainButton from "./MainButton";
import Login from "@/components/login/Login";
import Link from "next/link";

function NavBar(props?: any) {
  const links = [
    {
      route: "/explore",
      name: "Projects",
      badgeCount: 0,
    },
    {
      route: "/voting",
      name: "Voting",
      badgeCount: 0,
    },
    {
      route: "/explore",
      name: "Media Archive",
      badgeCount: 0,
    },
    {
      route: "/",
      name: "Careers",
      badgeCount: 4,
    },
    {
      route: "/dashboard/donations",
      name: "Dashboard",
      badgeCount: 0,
    },
  ];
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const [navBg, setNavBg] = useState(false);
  const isHome = props.name === "Homepage" ? true : false;

  const changeNavBg = () => {
    window.scrollY >= 20 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <div className="md:sticky md:top-0 md:shadow-none z-20 mt-[5rem] md:mt-0">
      {/* DESKTOP */}
      <div
        className={`hidden lg:block fixed w-full ${
          props.name == "browse" ? "border-2 border-[#E3E1E3] bg-white" : ""
        } animate-in fade-in zoom-in ${
          isHome && navBg
            ? "bg-white top-0 scroll-smooth ease-in-out transition-all duration-300"
            : "bg-transparent"
        } p-4`}
      >
        <div className="flex justify-between mx-4 items-center">
          <Link href="/">
            <img src="/images/logo.svg" className="w-[180px]" alt="logo" />
          </Link>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {links.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Link href={item.route}>
                  <p
                    className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[400] text-gray`}
                  >
                    {item.name}
                  </p>
                </Link>
                {item.badgeCount ? (
                  <div className="h-8 w-8 rounded-full bg-primary flex justify-center items-center  font-semibold text-white">
                    {item.badgeCount}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[20px] select-none">
            <Link href="/create">
              <MainButton
                text="Create"
                width="contain"
                size="small"
                className="bg-white border-2 text-[#31373D] border-[#EDEEF0] hover:bg-white"
              />
            </Link>

            <Login width="!w-[200px]" />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img src="/images/logo.svg" className="w-[180px]" alt="logo" />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/images/menu.svg"
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {links.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <p
                    className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
                  >
                    {item.name}
                  </p>
                  {item.badgeCount ? (
                    <div className="h-8 w-8 rounded-full bg-primary flex justify-center items-center  font-semibold text-white">
                      {item.badgeCount}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-[20px] select-none">
                <Link href="/create">
                  <MainButton
                    text="Create"
                    width="contain"
                    className="bg-white text-[#31373D] border-[#EDEEF0] hover:bg-white"
                  />
                </Link>

                <Login width="!w-full" />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
