import { UIState } from "./";

export enum UIActions {
  SetOpenSideBar = "UI - Open Sidebar",
  SetCloseSideBar = "UI - Close Sidebar",
  SetIsAddingEntry = "UI - Set isAddingEntry",
  SetIsStartDragging = "UI - Start Dragging",
  SetIsEndDragging = "UI - End Dragging",
  SetIsFetching = "SET_IS_FETCHING",
}

type UIActionType =
  | { type: UIActions.SetOpenSideBar }
  | { type: UIActions.SetCloseSideBar }
  | { type: UIActions.SetIsAddingEntry; payload: boolean }
  | { type: UIActions.SetIsEndDragging }
  | { type: UIActions.SetIsStartDragging }
  | { type: UIActions.SetIsFetching; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case UIActions.SetOpenSideBar:
      return {
        ...state,
        sidemenuOpen: true,
      };

    case UIActions.SetCloseSideBar:
      return {
        ...state,
        sidemenuOpen: false,
      };

    case UIActions.SetIsAddingEntry:
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case UIActions.SetIsStartDragging:
      return {
        ...state,
        isDragging: true,
      };

    case UIActions.SetIsEndDragging:
      return {
        ...state,
        isDragging: false,
      };
    case UIActions.SetIsFetching:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
};
