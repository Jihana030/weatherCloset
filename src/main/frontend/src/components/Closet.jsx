import React from "react";
import styled from "styled-components";
import Wear from "./Wear.jsx";

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
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
                <Wear></Wear>
            </div>
        </ClothesStyles>
    )
}

const ClothesStyles = styled.div`
    width: 400px;
    margin-left: 40px;
    .category {
        padding-bottom: 5px;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            height: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: var(--main-blue03);
            border-radius: 10px;
        }
        margin: 10px 0;
        ul {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            li {
                margin: 0 5px;
                padding: 10px 20px;
                background: var(--main-blue02);
                color: var(--main-white);
                white-space: nowrap;
                cursor: pointer;
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
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        height: 436px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: var(--main-blue03);
            border-radius: 10px;
        }
        > * {
            margin: 10px;
            width: calc(33.3% - 20px);
        }
    }
`

export default Closet;