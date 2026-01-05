"use client"

import { useRouter } from "next/navigation";

import React, { useLayoutEffect, useRef, useState } from "react";

import { Search } from 'lucide-react';

import { Header, Inner, H1, Button, Div, Container } from "./_html";
import { SearchBox } from "../SearchBox/Index";


export const Headers = () => {
    const router = useRouter();

    const [ isSearch, SetIsSearch ] = useState<boolean>(false);

    const btnSearchRef = useRef<HTMLButtonElement>(null);

    const searchBoxRef = useRef<HTMLDivElement>(null);

    function CloseCallback(e : React.UIEvent) {
        e.stopPropagation();
        router.back()
    }

    function SearchToggleCallback() { 
        SetIsSearch(!isSearch);
    };

    function SearchLayerClose(e : React.UIEvent) {
        if(e.target === e.currentTarget) SearchToggleCallback();
    }

    useLayoutEffect(() => {
        if(!isSearch) return
        if(!btnSearchRef["current"]) return
        if(!searchBoxRef["current"]) return

        const btnSearch = btnSearchRef["current"];
        const searchBox = searchBoxRef["current"];

        const btnSearchRect = btnSearch.getBoundingClientRect()
        searchBox.style.top = `90px`;
        searchBox.style.right = `${(window.innerWidth - btnSearchRect["x"]) - 80}px`; 

    },[isSearch])


    return (
        <>
            <Header>
                <Inner>
                    <H1 onClick={CloseCallback}>
                        Discover <br/> Exhibitions
                    </H1>
                    <Button ref={btnSearchRef} onClick={SearchToggleCallback}>
                        <Search/>
                    </Button>
                </Inner>
            </Header>

            {
                isSearch 
                && 
                <Div onClick={SearchLayerClose}>
                    <Container ref={searchBoxRef}>
                        <SearchBox/>
                    </Container>
                </Div>
            }
        </>
    );
};