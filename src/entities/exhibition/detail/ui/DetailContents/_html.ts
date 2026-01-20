import { styled } from 'styled-components'

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

export const Div = styled.div`
    position: relative;
    display: block;
    max-width: 350px;
    max-height: 450px;
    margin-right: 20px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    @media all and (max-width: 750px) {
        max-width: 100%;
        max-height: 560px;
        margin-right: 0;
        text-align: center;

        img {
            width: 350px;
            height: auto;
        }
    }

    @media all and (max-width: 499px) {
        img {
            width: 100%;
        }
    }
`;

export const Dl = styled.dl`
    dt {
        margin-bottom: 15px;
        font-size: 2rem;
        text-decoration: underline;
    }

    dd {
        line-height: 1.6;
        font-size: 1.3rem;
        word-break: keep-all;

        &.title {
            line-height: 1.4;
            max-width: 450px;
            margin-bottom: 15px;
            font-size: 1.7rem;
            word-break: keep-all;
        }

        &.category {
            display: flex;
            gap: 10px;
            margin-top: 40px;
            span {
                padding: 5px 10px;
                color: #7f7f7e;
                font-size: 1.1rem;
                background-color: #302d2d;
                border-radius: 10px;
            }
        }
    }

    @media all and (max-width: 750px) {
        margin-top: 20px;
        color: #000;

        dt, dd { color: #000 }
    }

    @media all and (max-width: 600px) {
        dt { font-size: 1.5rem }
    }

    @media all and (max-width: 499px) {
        dd {
            font-size: 1rem;

            &.category span { font-size: 0.8rem}
        }
    }
`;
