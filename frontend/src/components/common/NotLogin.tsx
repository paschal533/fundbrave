import React from 'react'
import Login from "@/components/login/Login";
import InfoBar from "@/components/infobar";

function NotLogin() {
  return (
    <>
    <InfoBar />
    <div className="w-full align-middle place-content-center justify-center items-center flex flex-col">
      <h1 className="text-2xl font-semibold text-primary mb-10 mt-10">Login To View Account Details</h1>
    <Login width="!w-[200px]"/>
    </div>
  </>
  )
}

export default NotLogin