import React from "react";
import {Route, Routes} from "react-router-dom";
import Dressing from "./components/Dressing.jsx";
import BoardList from "./components/BoardList.jsx";
import Home from "./Home.jsx";
import NotFind from "./components/NotFind.jsx";
import Header from "./components/Header.jsx";
import BoardView from "./components/BoardView.jsx";

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="dressing" element={<Dressing/>}/>
                <Route path="boardList" element={<BoardList/>} />
                <Route path="boardView" element={<BoardView/>} />
                <Route path="*" element={<NotFind/>} />
            </Route>
        </Routes>
    </div>
  )
}

export default App
