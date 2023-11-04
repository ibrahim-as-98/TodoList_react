import {  createContext, useState } from "react";
import Snackbarcom from "../components/Sneakbarcom";

export const Snackbarcontext = createContext({});

export const SnackbarProvider = ({children} ) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("false");
  function showHidesnackbar(message) {
    setmessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <Snackbarcontext.Provider value={{ showHidesnackbar }}>
      <Snackbarcom open={open} message={message} />
      {children}
    </Snackbarcontext.Provider>
  );
};
