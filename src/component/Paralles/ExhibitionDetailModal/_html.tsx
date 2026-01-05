'use client'

import { styled } from 'styled-components'
import { Quill } from '../../shared/Quill/Index'

export const Wrapper = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100dvw;
    height : 100dvh;
    color : #fff;
    z-index : 999;
    background-color : rgba(0,0,0,0.7);
`

export const Section = styled.section`
    container-type: inline-size;
    position : relative;
    display : block;
    max-width : 750px;
    max-height : 800px;
    width : 100%;
    padding : 20px;
    background-image: url("/modalBackground.png"); 
    border : 1px solid #000;
    border-radius : 10px;
    box-shadow : 3px 3px 3px rgba(0,0,0,0.5);
    z-index : 2;

    @media all and (max-width : 750px) { 
        width: 100%; 
        height : 100%;
        padding-bottom : 0;
    }
`

export const Div = styled.div`
    position :relative;
    overflow : auto;
    height : 100%;
    
    &::-webkit-scrollbar {
        display :none;
    }
`

export const Article = styled.article`
    position :relative;
    display : flex;
    justify-content : space-between;
    z-index : 4;

    @media all and (max-width : 750px) { 
        flex-direction : column;   
        width : calc(100%);
        margin : 30px auto 0;
        padding : 20px;
        background-color : #fff;
        border-radius : 20px 20px 0 0;
    }
`

export const ImgBox = styled.div`
    position : relative;
    display :block;
    max-width : 350px;
    max-height : 450px;
    margin-right : 20px;

    img {
        width : 100%;
        height : 100%;
        border-radius : 10px;
    }

    @media all and (max-width : 750px) {
        max-width : 100%;
        max-height : 560px;
        margin-right : 0;
        text-align : center;

        img {
            width : 350px;
            height : auto;
        }
    }

    @media all and (max-width : 499px) {
        img {
            width : 100%;
        }
    }
`

export const Dl = styled.dl`
    dt { margin-bottom : 15px; font-size : 2rem; text-decoration : underline; }

    dd { 
        line-height : 1.6;
        font-size : 1.3rem; 
        word-break : keep-all;
        
        &.title {
            line-height : 1.4;
            max-width : 450px;
            margin-bottom : 15px;
            font-size : 1.7rem;
            word-break : keep-all;
        }

        &.category {
            display : flex;
            gap : 10px;
            margin-top : 40px;
            span {
                padding : 5px 10px;
                color : #7F7F7E;
                font-size : 1.1rem;
                background-color : #302d2d;
                border-radius : 10px;
            }
        }
    }

    &.head {
        margin-bottom : 20px;
    }

    @media all and (max-width : 750px) {
        &.head {
            position : sticky;
            top : 0;
            margin-left : 30px;
        }

        &.info {
            margin-top : 20px;
            color : #000;

            dt, dd { color : #000}
        }
    }

    @media all and (max-width : 600px) {
        dt { font-size : 1.5rem; }
        &.head {
            padding-top : 60px;
            dt { margin-bottom : 50px; }
            dd {
                font-size : 1rem;
                &.title {
                    font-size : 1.2rem;
                }
            }
        }
    }

    @media all and (max-width :  499px) {
        
        dd {
            font-size : 1rem; 

            &.category span {
                font-size : 0.8rem;
            }
        }
        &.head {
            dd.title {
                max-width : 300px;
            }
        }
    }
    
`

export const BtnList = styled.ul`
    position : absolute;
    top : 0;
    right : 0px;
    display : inline-flex;
    gap : 15px;
    z-index : 3;

    li {
        button {
            svg {
                width : 30px;
                height : 30px;
            }       
        }
    }

    @media all and (max-width : 750px) {
        position : fixed;
        top : 20px;
        right : 20px;
    }
`

export const ExhibitionContents = styled(Quill)`
    min-height : 65px;
    line-height : 1.4;
    font-size : 1.4rem;
    word-break : keep-all;
`