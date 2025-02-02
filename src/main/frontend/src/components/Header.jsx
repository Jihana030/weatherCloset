import  React from "react";
import styled from "styled-components";
import Weather from "./Weather.jsx";
import Sidebar from "./Sidebar.jsx";

function Header() {
    return (
        <HeaderStyle className="header">
            <Weather></Weather>
            <Sidebar></Sidebar>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

export default Header;