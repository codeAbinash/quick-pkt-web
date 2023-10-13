// MyContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define your context type
interface PopupAlertType {
  data: number;
  updateData: (newData: number) => void;
}

// Create a context
const PopupAlertContext = createContext<PopupAlertType | null>(null);

// Create a custom hook for accessing the context
export const usePopupAlertContext = () => {
  const context = useContext(PopupAlertContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

// Create the provider component
export const PopupAlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<number>(0);
  const updateData = (newData: number) => {
    setData(newData);
  };
  return <PopupAlertContext.Provider value={{ data, updateData }}>{children}</PopupAlertContext.Provider>;
};
