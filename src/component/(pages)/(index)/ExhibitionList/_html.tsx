'use client'

import { styled } from 'styled-components'

export const Section = styled.section`
    width : 880px;
    margin : 30px auto 0;
    padding : 30px 0;

    @media all and (max-width : 880px) {
        width : 100%;
        padding : 30px 0px;
    }

    @media all and (max-width : 499px) {
        margin-top : 0;
        padding-top : 0;
    }
`

export const Ul = styled.ul`
    display : flex;
    flex-wrap : wrap;
    gap : 20px;
    width : 100%;
    li {
        width : calc(25% - 15px);

        a {
            display : flex;
            flex-direction: column;
            justify-content: flex-end;

            img { 
                width : 205px;
                height : 220px;
                border-radius : 10px 10px 0 0;
            }
        }

        
    }

    @media all and (max-width : 880px) {
        width : 100%;
        padding : 30px;

        li {
            width : calc(33.33% - 15px);
            a {
                img {
                    width : 100%;
                    heigth : auto;
                }
            }
        }
    }

    @media all and (max-width : 640px) {
        li {
            width : calc(50% - 15px);
            a {
                img {
                    width : auto;
                    height: 50vw;
                }
            }
        }
    }

`

export const Dl = styled.dl`
    position :relative;
    display : block;
    width : 100%;
    height : 190px;
    padding : 20px;
    color : #fff;
    background-color : #222226;
    border-radius : 0 0 10px 10px;

    dt {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height : 1.4;
        font-size : 1.2rem;
        word-break : keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    dd {
        margin-top : 10px;
        color : #7F7F7E;
        font-size : 0.95rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    

        &.category {
            position : absolute;
            bottom : 10px;
            left : 20px;
            display : flex;
            gap : 5px;
            margin-top : 20px;
            span {
                padding : 5px 10px;
                background-color : #302d2d;
                border-radius : 6px;
                box-shadow : 3px 3px 3px rgba(0,0,0,0.3)
            }
        }
    }

    @media all and (max-width : 800px) {
        width : 100%;
        height : 160px;
        padding : 15px;
        
        dt { font-size : 1rem; }
        dd { 
            font-size : 0.85rem; 
            &.category {
                left : 15px;
            }
        }
    }

    @media all and (max-width : 450px) {
        height : 140px;
        dt { font-size : 0.8rem; }
        dd { font-size : 0.65rem; }
    }
`

export const Empty = styled.p`
    position : relative;
    display : flex;
    justify-content : center;
    flex-direction : column;
    align-items : center;
    color : #7F8080;
    font-size : 1.8rem;

    svg {
        display : block;
        width : 50px;
        height : 50px;
        margin-bottom : 30px;
    }
`