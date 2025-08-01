// src/context/SidebarContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextType {
  activeLink: string;
  changeActiveLink: (path: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeLink, setActiveLink] = useState<string>("/");

  const changeActiveLink = (path: string) => setActiveLink(path);

  return (
    <SidebarContext.Provider value={{ activeLink, changeActiveLink }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
