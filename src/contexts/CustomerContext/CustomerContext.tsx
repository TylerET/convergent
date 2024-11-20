import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User, User } from "../../models/models";
import { getUserOrCreate } from "../../api/apiService";

interface CustomerContextProps {
  isLoggedIn: boolean;
  customerData: User | null;
  setCustomerData: (data: any) => void;
  selectedLocation: string;
  logIn: (screenHint?: any) => void;
  logOut: () => void;
  updateLocation: (city: string) => void;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user = null,
  } = useAuth0();
  const [selectedLocation, setSelectedLocation] = useState("Charlotte");
  const [customerData, setCustomerData] = useState(user);

  const logIn = (screenHint = null) => {
    screenHint
      ? loginWithRedirect({ authorizationParams: { screen_hint: screenHint } })
      : loginWithRedirect();
  };

  const logOut = () => {
    // @ts-ignore
    logout({ returnTo: window.location.origin });
  };

  const updateLocation = (city: string) => {
    setSelectedLocation(city);
  };

  useEffect(() => {
    const handleUser = async () => {
      if (user) {
        const dbUser = await getUserOrCreate(user as Auth0User);
        setCustomerData(dbUser);
      }
    };
    handleUser();
  }, [user]);

  return (
    <CustomerContext.Provider
      value={{
        isLoggedIn: isAuthenticated,
        // @ts-ignore
        customerData,
        selectedLocation,
        logIn,
        logOut,
        updateLocation,
        setCustomerData,
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
