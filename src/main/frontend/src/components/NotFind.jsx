import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

function NotFind(){
    return (
        <NotFoundStyle>
            <p>페이지를 찾을 수 없습니다.</p>
            <Link to="/">홈으로</Link>
        </NotFoundStyle>
    )
}

const NotFoundStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    p {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 700;
    }
    a {
        padding: 10px 20px;
        background: var(--main-blue03);
        color: var(--main-white);
        border-radius: 10px;
    }
`
export default NotFind;