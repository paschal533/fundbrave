"use client"
import React from "react";
import useAuth from "@/hooks/useAuth";

type Context = ReturnType<typeof useAuth>;

export const AuthContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const value = useAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
