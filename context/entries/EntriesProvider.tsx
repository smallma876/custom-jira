import { FC, ReactNode, useEffect, useReducer, useContext } from "react";

import { useSnackbar } from "notistack";

import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { UIContext } from "../ui";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface EntriesProviderProps {
  children: ReactNode;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({
  children,
}: EntriesProviderProps) => {
  const { setIsFetching } = useContext(UIContext);
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    setIsFetching(true);
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    setIsFetching(false);
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ): Promise<void> => {
    try {
      setIsFetching(true);
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      setIsFetching(false);
      if (showSnackbar)
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    setIsFetching(true);
    const { data } = await entriesApi.get<Entry[]>("/entries");
    setIsFetching(false);
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
