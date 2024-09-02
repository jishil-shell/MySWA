import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState([]);
    const [resultData, setResultData] = useState([]);

    return (
        <DataContext.Provider value={{ jsonData, setJsonData, resultData, setResultData}}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
