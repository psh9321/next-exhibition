import { styled } from "styled-components";

export const Dl = styled.dl`
    margin-bottom: 20px;

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
        position: sticky;
        top: 0;
        margin-left: 30px;
    }

    @media all and (max-width: 600px) {
        padding-top: 60px;
        dt {
            margin-bottom: 50px;
            font-size: 1.5rem;
        }
        dd {
            font-size: 1rem;

            &.title {
                font-size: 1.2rem;
            }
        }
    }

    @media all and (max-width: 499px) {
        dd {
            font-size: 1rem;

            &.category span {
                font-size: 0.8rem;
            }

            &.title {
                max-width: 300px;
            }
        }
    }
`;
