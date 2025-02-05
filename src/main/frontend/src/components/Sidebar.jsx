import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <CategoryStyle>
            <Link to="/" className="select li">옷장</Link>
            <Link to="/" className="li">지역변경</Link>
            <Link to="/boardList" className="li">게시판</Link>
            <Link to="/" className="li">마이페이지</Link>
        </CategoryStyle>
    )
}

const CategoryStyle = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 0 0 10px;
    overflow: hidden;
    .li {
        background: var(--main-blue01);
        color: var(--main-white);
        padding: 16px;
        cursor: pointer;
    }
    .li.select {
        background: var(--main-blue04);
    }
`

export default Sidebar;