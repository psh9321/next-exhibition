'use client'

import { styled } from 'styled-components'

export const Aside = styled.aside`
    position : fixed;
    top : 50px;
    left : 0;
    width : 350px;
    opacity : 0;
    transition : 0.25s ease;

    &.active {
        left : 70px;
        opacity : 1;
    }

    @media all and (max-width : 1760px) {
        width : 250px;
    }
`

export const Div = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    width : 700px;
    height : 261px;
    margin : 40px auto 0;

    @media all and (max-width : 700px) {
        width : 100%;
        padding : 20px;
    }
`

export const Dl = styled.dl`
    display : inline-block;
    line-height : 1.5;
    color : #fff;
    
    dt { font-size : 2.4rem; font-family : "logo" }
    dd { font-size : 1.4rem }

    @media all and (max-width : 499px) {
        dt { font-size : 1.5rem; }
        dd { font-size : 1.2rem }
    }
`