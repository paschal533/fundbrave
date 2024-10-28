"use client";
import React, { useState } from "react";
import useProfile from "@/hooks/useProfile";

type Context = ReturnType<typeof useProfile>;

export const ProfileContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const ProfileProvider = ({ children }: Props) => {
  const value = useProfile();

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
