import React, { createContext, useState, ReactNode } from "react";
import "../sass/components/snackbar/_snackbar.scss";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{ message: string } | null>(null);

  const showSnackbar = (message: string) => {
    setSnackbar({ message });
    setTimeout(() => setSnackbar(null), 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <div className="snackbar">
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
