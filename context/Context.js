import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { TIME_LIMIT_R_TOKEN, FETCH_URL } from "../constants";
export { TIME_LIMIT_R_TOKEN, FETCH_URL };
const defaultLoginValue = {
  userData: false,
  setData: () => {},
};

export const AppContext = createContext(defaultLoginValue);
export const ContentContext = createContext();
export function AppWrapper({ children }) {
  const [userData, setData] = useState({
    error: false,
  });
  const router = useRouter();
  const saveData = (obj) => {
    setData({ ...userData, ...obj });
  };
  const reloginUser = () => {
    document.cookie = `userData=0;  max-age=${-1}`;
    router.push("/");
  };
  const loginUser = (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch(`${FETCH_URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const storageToken = JSON.stringify({
          refreshToken: data.result.refresh_token,
          email,
        });
        document.cookie = `userData=${storageToken}; max-age=${TIME_LIMIT_R_TOKEN}`;
        saveData({ error: false });
        router.push("/content/0?number=10&filter=start");
      })
      .catch((err) => {
        saveData({ error: true });
      });
  };

  return (
    <AppContext.Provider value={[userData, loginUser, saveData, reloginUser]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
