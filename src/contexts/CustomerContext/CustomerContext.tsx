import React, { createContext, useContext, useState, ReactNode } from "react";

interface CustomerContextProps {
  isLoggedIn: boolean;
  customerData: { name: string; email: string } | null;
  selectedLocation: string;
  logIn: (name: string, email: string) => void;
  logOut: () => void;
  updateLocation: (city: string) => void;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("charlotte");

  const logIn = (name: string, email: string) => {
    setIsLoggedIn(true);
    setCustomerData({ name, email });
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setCustomerData(null);
  };

  const updateLocation = (city: string) => {
    setSelectedLocation(city);
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoggedIn,
        customerData,
        selectedLocation,
        logIn,
        logOut,
        updateLocation,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
