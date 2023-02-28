import { useSnackbar } from "notistack";
import { FC, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En-Progreso Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Terminadas: Commodo veniam aliqua tempor officia officia non laborum.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

interface EntriesProviderProps {
  children: ReactNode;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    enqueueSnackbar("Entrada actualizada", {
      variant: "success",
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    dispatch({ type: "[Entry] Entry-Updated", payload: entry });
  };

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
