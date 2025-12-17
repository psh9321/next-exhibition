'use client'

import { styled } from 'styled-components'

export const Header = styled.header`
    position : fixed;
    top : 0;
    left : 0;
    display : block;
    width : 100%;
    height : 70px;
    margin : 0 auto;
    background-color : rgba(0,0,0,0.7);
    z-index : 1;
`

export const Inner = styled.div`
    position :relative;
    display : flex;
    justify-content : space-between;
    align-items : center;
    width : 1250px;
    height : 100%;
    margin : 0 auto;
    color : #fff;

    svg {
        width : 24px;
        stroke : #fff;
    }

    @media all and (max-width : 1250px) {
        width : 100%;
        padding : 0 40px;
    }
`

export const H1 = styled.h1`
    display : inline-block;
    line-height : 1.3;
    font-size : 1.2rem;
    cursor : pointer;
    font-family : "logo"
`

export const Button = styled.button`
    display : inline-flex;
    justify-content : center;
    align-items : center;
    width : 40px;
    height : 40px;
    text-align : center;
    cursor : pointer;
`

export const Div = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    display : block;
    width : 100%;
    height : 100%;
    z-index : 2;
`

export const Container = styled.div`
    position : absolute;
    top : 90px;
    right : 20px;
    // transform : scale(0);
    display : block;
    width : 450px;
    padding :0 20px 50px;
    background-color : #444444;
    border-radius : 20px;
    transform 0.35s ease, opacity 0.35s ease;

    &:before { 
        content : "";
        position: absolute;
        top: -40px;
        right: 40px;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 20px;
        border-color: transparent transparent #444444 transparent;
    }
`