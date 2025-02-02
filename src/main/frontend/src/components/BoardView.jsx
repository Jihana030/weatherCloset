import React from "react";
import styled from "styled-components";
import Header from "./Header.jsx";
import ViewTable from "./ViewTable.jsx";

function BoardView(){
    return (
        <div>
            <Header />
            <ViewTable></ViewTable>
        </div>
    )
}

export default BoardView;