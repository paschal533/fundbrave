"use client";
import React, { useContext } from "react";
import BreadCrumb from "./bread-crumb";
import Login from "@/components/login/Login";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center md:pr-4 pr-0 py-1 mb-8 ">
      <BreadCrumb />
      <div className="gap-3 space-x-4 md:flex hidden items-center">
        <Login width="!w-[200px]" />
      </div>
    </div>
  );
};

export default InfoBar;
