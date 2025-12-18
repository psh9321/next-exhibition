'use client'

import { useLayoutEffect, useRef, useState } from "react";
import { Article, Button, Container, Ul } from "./_html";

import { BodyScrollLock } from "@/util/bodyScrollLock";

const directionOpts = {
    가로 : "horizontal",
    세로 : "vertical"
} as const

type DIRECTION = typeof directionOpts[keyof typeof directionOpts];

interface  DROP_MENU_DATA_ITEM {
    key : string,
    value : string,
}
interface DROP_DOWN_MENU {
    data : DROP_MENU_DATA_ITEM[],
    defaultValue : string,
    hiddenText? : string,
    direction? : DIRECTION,
    validata : (val : string) => void,
}

export const DropDownMenu = ({ data, defaultValue, hiddenText, direction, validata } : DROP_DOWN_MENU) => {
    
    const [ value, SetValue ] = useState<string>(defaultValue);

    const [ isVisible, SetIsVisible] = useState<boolean>(false);

    const btnRef = useRef<HTMLButtonElement>(null);

    const menuRef = useRef<HTMLUListElement>(null);

    function ToggleCallback() { 
        if(isVisible) {
            
            menuRef["current"]?.classList.remove("on");
            const timer = setTimeout(() => {
                SetIsVisible(false);    

                clearTimeout(timer);
            }, 250);
        }
        else {
            if(!menuRef["current"]) return 

            SetIsVisible(true);
        }
        
    };

    function SetValidate(value : string) {
        SetValue(value);
        validata(value);
    }

    function GetKey(value : string) {

        if(!value) return "";

        const find = data.find(el => el["value"] === value);

        return find ? find["key"] : value;
    }

    useLayoutEffect(() => {
        if(!btnRef["current"]) return 
        if(!menuRef["current"]) return 

        BodyScrollLock(isVisible);
        
        const menuList = menuRef["current"];
        
        if(isVisible) {
            const { x, y } = btnRef["current"].getBoundingClientRect();
    
            menuList.style.top = `${y}px`;
            menuList.style.left = `${x + 105}px`;

            menuList.classList.add("on");
        }

    },[isVisible]);

    return (
        <Article>
            <h2 className="hidden">{hiddenText??"드롭다운 메뉴"}</h2>
            <Button onClick={ToggleCallback} ref={btnRef}>{GetKey(value)}</Button>
            <Container onClick={ToggleCallback} className={`${isVisible && "on"}`}>
                <Ul ref={menuRef} className={direction}>
                    {
                        data.map((el, i) => {
                            return (
                                <li key={`${el["key"]}-${i}`} onClick={() => SetValidate(el["value"])} >{el["key"]}</li>
                            )
                        })
                    }
                </Ul>
            </Container>
        </Article>
    );
};