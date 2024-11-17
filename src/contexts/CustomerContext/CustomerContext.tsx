import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface CustomerContextProps {
  isLoggedIn: boolean;
  customerData: { name: string; email: string } | null;
  selectedLocation: string;
  logIn: (screenHint?: any) => void;
  logOut: () => void;
  updateLocation: (city: string) => void;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [customerData, setCustomerData] = useState<any>(user ?? null);
  const [selectedLocation, setSelectedLocation] = useState("Charlotte");

  const logIn = (screenHint = null) => {
    screenHint
      ? loginWithRedirect({ authorizationParams: { screen_hint: screenHint } })
      : loginWithRedirect();
    setCustomerData(user);
  };

  const logOut = () => {
    setCustomerData(null);
    logout();
  };

  const updateLocation = (city: string) => {
    setSelectedLocation(city);
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoggedIn: isAuthenticated,
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
