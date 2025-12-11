import React from 'react'
import Header from './components/header/header.jsx';
import Pages from './components/pages/pages.jsx';
import { DataProvider } from './GlobalState';
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (

    <DataProvider>  
      <Router>
        <div className="app">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  )
}

export default App