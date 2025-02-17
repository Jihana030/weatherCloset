import React from "react";
import styled from "styled-components";

function Loading() {
    return (
        <LoadingStyled>
            <span className="material-symbols-rounded">progress_activity</span>
        </LoadingStyled>
    )
}

const LoadingStyled = styled.div`
    span {
        animation: rotating 1s infinite linear;
        user-select: none;
        font-weight: 700;
        color: var(--main-blue03);
    }
    
    @keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`
export default Loading;