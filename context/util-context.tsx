import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { server } from "config/index";

const UtilContext = React.createContext({
  showMenuState: false,
  showMenu: () => {},
  setShowMenuState: (showMenu: boolean) => {},
  escShowMenu: () => {},
  loadingState: true,
  setLoadingStateHandler: () => {},
  resetLoadingStateHandler: () => {},
  expired: false,
  setExpiredHandler: () => {},
  resetExpiredHandler: () => {},
});

export const UtilContextProvider: React.FC<{
  children?: React.ReactNode;
  className?: {};
  onClick?: any;
}> = (props) => {
  const router = useRouter();
  const [showMenuState, setShowMenuState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [expired, setExpired] = useState(false);

  const setLoadingStateHandler = () => {
    setLoadingState(true);
  };

  const showMenuHandler = () => {
    setShowMenuState(!showMenuState);
  };

  const escShowMenuHandler = () => {
    setShowMenuState(false);
  };

  const resetLoadingStateHandler = () => {
    setLoadingState(false);
  };

  const setExpiredHandler = () => {
    setExpired(true);
  };
  const resetExpiredHandler = () => {
    setExpired(false);
  };

  // useEffect for removing nav mobile drop down menu on route change
  useEffect(() => {
    setShowMenuState(false);
  }, [router]);
  // useEffect for removing nav mobile drop down menu on route change

  return (
    <UtilContext.Provider
      value={{
        showMenuState: showMenuState,
        showMenu: showMenuHandler,
        setShowMenuState: setShowMenuState,
        escShowMenu: escShowMenuHandler,
        loadingState: loadingState,
        setLoadingStateHandler: setLoadingStateHandler,
        resetLoadingStateHandler: resetLoadingStateHandler,
        expired: expired,
        setExpiredHandler: setExpiredHandler,
        resetExpiredHandler: resetExpiredHandler,
      }}
    >
      {props.children}
    </UtilContext.Provider>
  );
};

export default UtilContext;
