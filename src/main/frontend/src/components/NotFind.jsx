import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

function NotFind(){
    return (
        <div>
            페이지를 찾을 수 없습니다.
            <Link to="/">홈으로</Link>
        </div>
    )
}

export default NotFind;