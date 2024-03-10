import React, { useState } from 'react';
import createSafeContext from '../lib/createSafeContext';
import { MovieData } from '../data';

// Create a new context
const { Provider: DataProvider, useContext: useDataContext } = createSafeContext();

// Create a provider component
const DataProviderWrapper = ({ children }) => {
    // Define your state variables here
    const [data, setData] = useState({
        location: 'movie',
        activeCategory: 0,
        activeCategoryIndex:0,
        MovieData
    });

    // Return the context provider with the state and functions
    return (
        <DataProvider value={{ data, setData }}>
            {children}
        </DataProvider>
    );
};

export { DataProviderWrapper as DataProvider, useDataContext as DataContext };
