'use client'

import { styled } from 'styled-components'

export const Article = styled.article`
    font-size : 1.1rem;
`

export const Button = styled.button`
    width : 100px;
    height : 40px;
    line-height : 40px;
    text-align : center;
    background-color : #282F3E;
    border-radius : 5px;
`

export const Container = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    display : none;
    width : 100%;
    height : 100%;
    z-index : 2;
    
    &.on {
        display : block;
    }
`

export const Ul = styled.ul`
    position : absolute;
    transform : scale(0);
    transform-origin: top left;
    display :flex;
    flex-wrap : wrap;
    width : 302px;
    background-color : #1E2939;
    border-radius : 10px;
    border : 1px solid #343E4D;
    transition : 0.25s ease;    

    &.on {
        transform : scale(1);

        li {
            opacity : 1;
        }
    }

    li {
        display : inline-block;
        width : 100px;
        height : 40px;
        line-height : 40px;
        text-align : center;
        border-right : 1px solid #343E4D;
        opacity : 0;
        transition : 0.1s ease;

        &:nth-child(3n) {
            border-right : none;
        }

        &:nth-child(n+4) {
            border-top : 1px solid #343E4D;
        }

        &.on,
        &:hover {
            background-color : #343E4D;
        }

    }
    

    &.vertical {
        width : 102px;

        li {
            border-right : none;
            &:nth-child(n+2) {
                border-top : 1px solid #343E4D;
            }
        }
    }

    @media all and (max-width : 600px) {
        width : 242px;
        li {
            width : 80px;
            font-size : 0.9rem
        }
    }

    @media all and (max-width : 499px) {
        left : 20px !important;
    }
`