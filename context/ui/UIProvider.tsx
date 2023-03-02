import { FC, useReducer, ReactNode } from "react";
import { UIActions, UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  isFetching: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isFetching: false,
};

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: UIActions.SetOpenSideBar });
  };

  const closeSideMenu = () => dispatch({ type: UIActions.SetCloseSideBar });

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: UIActions.SetIsAddingEntry, payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: UIActions.SetIsStartDragging });
  };

  const endDragging = () => {
    dispatch({ type: UIActions.SetIsEndDragging });
  };

  const setIsFetching = (isFetching: boolean) => {
    dispatch({ type: UIActions.SetIsFetching, payload: isFetching });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,
        setIsFetching,
        endDragging,
        startDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
