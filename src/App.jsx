import React, { useState } from 'react';
import SideNav from "./components/ui/SideNav"
import CardGrid from './components/ui/Card';
import { MovieData } from './data';
import { TestDataProvider } from './providers/TestDataProvider.jsx';

function App() {
  return (
    <TestDataProvider>
      <div>
        <SideNav />
        <div className="ml-16 mr-8 overflow-hidden mt-5">
          <CardGrid movieData={MovieData} />
        </div>
      </div>
    </TestDataProvider>

  )
}

export default App
