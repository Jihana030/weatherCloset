import React from "react";
import styled from "styled-components";

function WriteTable() {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text"/>
                    </td>
                </tr>
                <tr>
                    <th>작성자</th>
                    <td>닉네임</td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default WriteTable;