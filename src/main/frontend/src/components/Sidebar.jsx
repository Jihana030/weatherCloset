import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

function getLinkStyle({ isActive }) {
    return {
        background:  isActive ? 'var(--main-blue04)' : undefined,
    };
}

function Sidebar() {
    return (
        <CategoryStyle>
            <NavLink to="/" className="li" style={getLinkStyle}>옷장</NavLink>
            <NavLink to="location" className="li" style={getLinkStyle}>지역변경</NavLink>
            <NavLink to="boardList" className="li" style={getLinkStyle}>게시판</NavLink>
            <NavLink to="mypage" className="li" style={getLinkStyle}>마이페이지</NavLink>
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
`

export default Sidebar;