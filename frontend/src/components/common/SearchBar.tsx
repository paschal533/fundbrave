"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import searchBar from "../../../public/images/Search.png";
import arrow from "../../../public/images/arrow.png";

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}: any) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search, clearSearch, handleSearch]);

  return (
    <>
      <div className="flex-1 flex box-shadow justify-center align-middle dark:bg-nft-black-2 bg-white border-1 drop-shadow-md dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
        <Image
          src={searchBar}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={"filter invert"}
        />
        <input
          type="text"
          placeholder="Search Fundraisers here"
          className=" bg-white mx-4 w-full font-poppins text-nft-black-1 font-normal text-md outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="relative flexBetween lg:mt-0 lg:ml-4 ml-0 mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white box-shadow drop-shadow-md border-1 dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm font-medium mr-1">
          {activeSelect}
        </p>
        <Image
          src={arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={"filter invert"}
        />

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border-1 box-shadow drop-shadow-md dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {[
              "Recently added",
              "Price (low to high)",
              "Price (high to low)",
            ].map((item) => (
              <p
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
