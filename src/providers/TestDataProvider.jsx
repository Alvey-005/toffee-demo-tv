import React, { useState } from 'react';
import createSafeContext from '../lib/createSafeContext';
import { MovieData } from '../data';

// Create a new context
const { Provider: TestDataProvider, useContext: useTestDataContext } = createSafeContext();

// Create a provider component
const TestDataProviderWrapper = ({ children }) => {
    // Define your state variables here
    const [data, setData] = useState(MovieData);

    // Return the context provider with the state and functions
    return (
        <TestDataProvider value={{ data, setData }}>
            {children}
        </TestDataProvider>
    );
};

export { TestDataProviderWrapper as TestDataProvider, useTestDataContext as TestDataContext };
