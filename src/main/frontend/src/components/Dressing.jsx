import React from "react";
import styled from "styled-components";
import Closet from "./Closet.jsx";

const dressingStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
function Dressing() {
    return (
        <div>
            <div className="character">
                <img src="../assets/img/dressing_character_temp.png" alt="아바타"/>
            </div>
            <div>
                <Closet></Closet>
            </div>
        </div>
    )
}

export default Dressing;