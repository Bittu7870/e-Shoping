import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const GlobalFlowContext = (props) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if(mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = "#111827";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#ffffff";
    }
  }

  const value = {
    mode,
    toggleMode,
  }
  return (
    <GlobalContext.Provider value={value} {...props} />
  )
}

export default GlobalFlowContext
