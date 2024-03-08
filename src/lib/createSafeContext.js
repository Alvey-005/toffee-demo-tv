import React from "react";

export default function createSafeContext() {
  const context = React.createContext(undefined);

  function useContext() {
    const value = React.useContext(context);
    if (value === undefined) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return value;
  }

  return { useContext, Provider: context.Provider };
}
