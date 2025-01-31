import  React from "react";
import styled from "styled-components";
import Weather from "./Weather.jsx";
import Sidebar from "./Sidebar.jsx";

const headerStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`
function Header() {
    return (
        <div className="header">
            <Weather></Weather>
            <Sidebar></Sidebar>
        </div>
    )
}

export default Header;