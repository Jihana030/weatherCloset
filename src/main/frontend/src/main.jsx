import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dressing from "./components/Dressing.jsx";
import BoardList from "./components/BoardList.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}>
                  <Route path="/" element={<Dressing/>}/>
                  <Route path="/boardList" component={<BoardList/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
