import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

function BoardList() {
    return (
        <TableStyled>
            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td className="title"><Link to="/boardView">옷 늘려주세요</Link></td>
                    <td>25.02.02</td>
                </tr>
                </tbody>
            </table>
            <div className="paging">
                <span className="material-symbols-rounded prev">arrow_left</span>
                <div className="num">
                    <span className="select">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                </div>
                <span className="material-symbols-rounded next">arrow_right</span>
            </div>
        </TableStyled>
    )
}

const TableStyled = styled.div`
    color: var(--main-blue05); 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    table {
        width: 100%;
    }
    .title {
        cursor: pointer;
        text-align: left;
    }
    .paging {
        color: var(--main-blue01);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        span {
            cursor: pointer;
        }
        .select {
            color: var(--main-blue04);
        }
        .num {
            color: var(--main-blue03);
            span {
                padding: 0 5px;
            }
        }
    }
`

export default BoardList;