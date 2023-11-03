import React, { createContext, useContext, useState } from 'react';

const PdfContext = createContext();

export function usePdfContext() {
  return useContext(PdfContext);
}

export function PdfContextProvider({ children }) {
  const [allPdfs, setAllPdfs] = useState([]);

  return (
    <PdfContext.Provider value={{allPdfs, setAllPdfs }}>
      {children}
    </PdfContext.Provider>
  );
}