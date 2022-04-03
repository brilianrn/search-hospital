import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation, PageNotFound } from "./commons/components";
import { Home } from "./app/index";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <Home />
            </>
          } />
          <Route path="/*" element={
            <>
              <PageNotFound />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;