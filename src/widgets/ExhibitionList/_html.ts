import { styled } from "styled-components";

export const Article = styled.article`
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;

    @media all and (max-width: 880px) {
        padding: 30px;
    }
`;
