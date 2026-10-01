import { AuthenticationContext } from "@/contexts/authentication";
import React from "react";

export const useAuthentication = () => {
  const context = React.useContext(AuthenticationContext);

  if (context === undefined)
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider/AuthenticationContext"
    );

  return context;
};
