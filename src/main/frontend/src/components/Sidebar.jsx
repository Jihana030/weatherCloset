import React from "react";
import styled from "styled-components";

const categoryStyle = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 0 0 10px;
    li {
        background: var(--main-blue01);
        color: var(--main-white);
        padding: 16px;
    }
    li.select {
        background: var(--main-blue04);
    }
`

function Sidebar() {
    return (
        <categoryStyle>
            <li className="select">옷장</li>
            <li>지역변경</li>
            <li>게시판</li>
            <li>마이페이지</li>
        </categoryStyle>
    )
}

export default Sidebar;