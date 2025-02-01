import React from "react";
import styled from "styled-components";
import wear from "../assets/img/basicwear.png";

const WearStyle = styled.div`
    background: var(--main-grey);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .star {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: var(--main-yellow);
        font-size: 30px;
        &.fill {
            font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
        }
    }
`

function Wear() {
    return (
        <WearStyle>
            <img src={wear} alt="wear"/>
            <span className="material-symbols-rounded star fill">star</span>
        </WearStyle>
    )
}

export default Wear;
