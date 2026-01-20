import { styled } from 'styled-components'

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

export const Ul = styled.ul`
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