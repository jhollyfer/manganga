/* eslint-disable react-refresh/only-export-components */

import { API } from "@/lib/api";
import type { User } from "@/lib/model";
import { AxiosError } from "axios";
import React from "react";

export const APP_ID = "@MANGANGA:V1";

export interface AuthenticationIContext {
  logged: boolean;
  user: User | null;
  signIn: (payload: User) => void;
  signOut: () => void;
  check: () => Promise<void>;
}

export const AuthenticationContext = React.createContext<
  AuthenticationIContext | undefined
>(undefined);

type AuthenticationContextProps = {
  children: React.ReactNode;
};

export const AuthenticationProvider = ({
  children,
}: AuthenticationContextProps) => {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const signIn = React.useCallback((payload: User) => {
    setLogged(true);
    setUser(payload);
    localStorage.setItem(APP_ID, payload.id!.toString());
  }, []);

  const signOut = React.useCallback(() => {
    setLogged(false);
    setUser(null);
  }, []);

  const check = React.useCallback(async () => {
    try {
      const sub = localStorage.getItem(APP_ID);

      if (sub) {
        const { data } = await API.get<User>("/profile");
        setUser(data);
        setLogged(true);
        return;
      }

      const { data } = await API.get<User>("/profile");

      localStorage.setItem(APP_ID, data.id?.toString());
      setUser(data);
      setLogged(true);
    } catch (error) {
      console.log("Erro na verificação:", error);
      setLogged(false);
      setUser(null);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          localStorage.removeItem(APP_ID);
        }
      }
    }
  }, []);

  React.useEffect(() => {
    check();
  }, [check]);

  return (
    <AuthenticationContext.Provider
      value={{
        check,
        user: user || null,
        signIn,
        logged,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
