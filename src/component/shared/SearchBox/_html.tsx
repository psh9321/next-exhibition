'use client'

import { styled } from 'styled-components'

export const Section = styled.section`

`
export const Div = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    width : 100%;
    height : 50px;
    padding : 10px;
    background-color : #242425;
    border-radius : 10px;
    svg { width : 24px; stroke : #7F8080; }
`

export const Input = styled.input`
    display : block;
    width : calc(100% - 30px);
    height : 100%;
    color : #7F8080;
    font-size : 1.4rem;
    background : transparent;
    border : none;
    outline : none;
`

export const Ul = styled.ul`
    position :relative;
    display : flex;
    margin-top : 30px;
    color : #fff;

    > li {
        &:nth-child(n+2) {
            margin-left : 15px;
        }

        button {
            display : inline-block;
            width : 100px;
            height : 40px;
            line-height : 40px;
            text-align : center;
            background-color : #282F3E;
            border-radius : 5px;
        }

        &.submit {
            position : absolute;
            top : 0;
            right : 0;
        }
    }
`