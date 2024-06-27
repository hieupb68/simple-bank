import React, { createContext, useContext, useState } from "react";
import useModal from "../hook/useModal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const { isShowing, toggle } = useModal();
  const [payload, setPayload] = useState(null);
  const [callback, setCallback] = useState(null);

  const open = (payload = null) => {
    toggle();
    setPayload(payload);
  };

  const asynClose = async () => {
    if (callback) {
      await callback();
    }
    toggle();
  };

  return (
    <ModalContext.Provider
      value={{
        isShowing,
        toggle,
        payload,
        setPayload,
        open,
        asynClose,
        setCallback,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
