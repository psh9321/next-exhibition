"use client"

import { styled } from "styled-components"

export const Main = styled.main`
    position : relative;
    display : block;
    width : 100dvw;
    height : 100dvh;
    padding-top : 70px;
    font-family : "basic";
    
    &:after {
        content : "";
        position : fixed;
        top : 0;
        left : 0;
        display : block;
        width : 100%;
        height : 100%;
        background-image: url("/background.png");   
        background-position :center;
        background-size : cover;
        background-repeat : no-repeat;
        z-index : -1;
    }
`