import React from "react";
import Header from "./components/Header.jsx";
import {Outlet} from "react-router-dom";

function Home(){
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default Home;