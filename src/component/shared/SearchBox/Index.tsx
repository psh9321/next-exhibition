'use client'

import { Section, Ul } from "./_html";

import { SearchInputBox } from './SearchInputBox';
import { AreaSelectBox } from './AreaSelectBox';
import { CategorySelectBox } from "./CategorySelectBox";

export const SearchBox = () => {
    
    return (
        <Section>
            <h2 className="hidden">전시 제목, 지역, 장소, 카테고리 검색</h2>
            <SearchInputBox/>
            <Ul>
                <li><CategorySelectBox/></li>
                <li><AreaSelectBox/></li>
            </Ul>
        </Section>
    );
};