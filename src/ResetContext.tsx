import { createContext, useContext, ReactNode, useState } from "react";

interface ResetContextType {
  reset: () => void;
}

const ResetContext = createContext<ResetContextType | undefined>(undefined);

export function ResetProvider({ children }: { children: ReactNode }) {
  const [, forceUpdate] = useState({});

  const reset = () => {
    forceUpdate({});
  };

  return (
    <ResetContext.Provider value={{ reset }}>
      {children}
    </ResetContext.Provider>
  );
}

export function useReset() {
  const context = useContext(ResetContext);
  if (!context) {
    throw new Error("useReset deve ser usado dentro de ResetProvider");
  }
  return context;
}
