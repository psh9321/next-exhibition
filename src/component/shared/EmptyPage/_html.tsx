'use client'

import { styled } from 'styled-components'

export const Section = styled.section`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    

    @container (max-width : 1000px) {
        flex-direction : column;
    }

    @media all and (max-width : 1000px) {
        flex-direction : column;

        img {
            display : block;
            width : 490px;
            height : 340px;
            margin-top : 20px;
        }
    }
`

export const Div = styled.div`
    h1 {
        strong {
            display : block;
            margin-bottom : 15px;
            font-size : 6.5rem;
        }
        margin-bottom : 30px;
        color : #fff;
        font-size : 1.7rem;
    }

    p {
        line-height : 1.5;
        color : #75748A;
        font-size : 1.4rem;
    }

    a {
        display : inline-block;
        margin-top : 50px;
        padding : 20px 40px;
        color : #D4D4DE;
        font-size : 1.4rem;
        background-color : #2A264E;
        border-radius : 10px;
    }

    @media all and (max-width : 650px) {
        h1 {
            strong {
                font-size : 5rem;
            }

            font-size : 1.6rem;
        }

        p {
            font-size : 1.2rem;
        }
    }
`