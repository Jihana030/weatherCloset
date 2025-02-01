import React from "react";
import styled from "styled-components";
import Closet from "./Closet.jsx";
import character from "../assets/img/dressing_character_temp.png";

const DressingStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    .character {
        width: 182px;
        height: 317px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`
function Dressing() {
    return (
        <DressingStyle>
            <div className="character">
                <img src={character} alt="아바타"/>
            </div>
            <div>
                <Closet></Closet>
            </div>
        </DressingStyle>
    )
}

export default Dressing;