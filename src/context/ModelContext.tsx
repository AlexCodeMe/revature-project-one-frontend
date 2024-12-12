import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  showNewReimbursementForm: boolean;
  setShowNewReimbursementForm: (show: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showNewReimbursementForm, setShowNewReimbursementForm] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showNewReimbursementForm, setShowNewReimbursementForm }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}