'use client'

import { styled } from 'styled-components'


export const Wrapper = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    display : block;
    width : 100%;
    height : 100%;
    z-index : 3;
`

export const Inner = styled.div`
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 150px;
    height: 80px;
    background-color: #091257;
    border-radius: 20px;
    transition: 0.25s ease;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.8);

    &.on {
        bottom : 50px;
    }
`

export const SearchContents = styled.div`
    position: absolute;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    width: 100%;
    color: #fff;
    font-size: 22px;
    font-weight : 700;

    svg {
        width : 30px;
        height : 30px;
        stroke : #fff;
    }
`

export const Span = styled.span`
    position : absolute;
    top : 10px;
    left : 50%;
    transform : translate(-50%, -50%);
    width: 1.2ch;
    color : #fff;
    font-size : 130px;
    border-radius : 100%;
    padding : 10px;    

    &.search {
        top: 40px ;
        font-size: 70px !important;
    }
`