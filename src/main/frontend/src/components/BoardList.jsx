import React from "react";
import styled from "styled-components";

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
                    <td className="title">옷 늘려주세요</td>
                    <td>25.02.02</td>
                </tr>
                </tbody>
            </table>
            <div className="paging">
                <span className="material-symbols-rounded prev">arrow_left</span>
                <div>
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
    .title {
        cursor: pointer;
    }
    .paging {
        color: var(--main-blue01);
        span {
            cursor: pointer;
        }
        .select {
            color: var(--main-blue04);
        }
    }
`

export default BoardList;