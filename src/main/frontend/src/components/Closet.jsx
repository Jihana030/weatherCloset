import React from "react";
import styled from "styled-components";
import Wear from "./Wear.jsx";

const ClothesStyles = styled.div`
    .category {
        overflow-x: scroll;
        margin: 10px 0;
        ul {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            li {
                margin: 0 10px;
                padding: 10px 20px;
                background: var(--main-blue02);
                color: var(--main-white);
                &:first-child {
                    margin-left: 0;
                }
                &.select {
                    background: var(--main-blue04);
                }
            }
        }
    }
    .clothes {
        background: var(--main-white);
        border: 1px solid var(--main-blue05);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        height: 436px;
        overflow-y: scroll;
        > * {
            margin: 10px;
            width: 30%;
        }
    }
`

function Closet() {
    return (
        <ClothesStyles>
            <div className="category">
                <ul>
                    <li className="select">ALL</li>
                    <li>즐겨찾기</li>
                    <li>상의</li>
                    <li>하의</li>
                    <li>한벌</li>
                    <li>아우터</li>
                </ul>
            </div>
            <div className="clothes">
                <Wear></Wear>
            </div>
        </ClothesStyles>
    )
}

export default Closet;