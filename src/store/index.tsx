import React, { createContext, useReducer, useContext, ReactNode, useMemo } from "react";
import { appReducer, initialState, State, Action } from "./reduser";
import { handlerDrawerOpen } from "@/api/menu";

type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  closeDrawer: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const closeDrawer = () => {
    handlerDrawerOpen(false);
  };

  const value = useMemo(() => ({ state, dispatch, closeDrawer }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const useAppState = (): State => {
  return useAppContext().state;
};

export const useAppDispatch = (): React.Dispatch<Action> => {
  return useAppContext().dispatch;
};

export const useDrawer = (): { closeDrawer: () => void } => {
  const { closeDrawer } = useAppContext();
  return { closeDrawer };
};
