import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  isFetching: boolean;
  // Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;

  setIsAddingEntry: (isAdding: boolean) => void;
  setIsFetching: (isAdding: boolean) => void;
  endDragging: () => void;
  startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
