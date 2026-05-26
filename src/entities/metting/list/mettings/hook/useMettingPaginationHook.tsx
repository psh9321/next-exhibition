"use client"

import { useParams } from "next/navigation";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query"

import { API_CLIENT_METTING_METTINGS } from "../api/api.client.mettings.list";

const PAGINATION_LENGTH = 5;

const DATA_LENGTH = 10;

export const useMettingPaginationHook = () => {

    const { seq } = useParams<{seq : string}>();

    const [ currentPage, SetCurrentPage ] = useState(0);

    const [ currentPagination, SetCurrentPagination ] = useState(0);

    const { data } = useQuery({
        queryKey : ["metting","page","mettings", seq, currentPage],
        queryFn : async () => API_CLIENT_METTING_METTINGS(seq, currentPage, DATA_LENGTH),
    });

    const totalPage = data ? Math.ceil(data["total"] / DATA_LENGTH) : 0;

    const lastPage = Math.max(totalPage - 1, 0);

    const paginations = (() => {

        if(!data) return [];

        const total = Math.ceil(data["total"] / DATA_LENGTH);

        const arr = [];
        
        for(let i=0; i < total; i++) arr.push(i);

        const result = [];

        for(let i = 0; i < arr.length; i += PAGINATION_LENGTH) result.push(arr.slice(i, i + PAGINATION_LENGTH));

        return result
    })();

    function PageMoveCallback(pageIdx : number) {
        if(pageIdx < 0) return
        if(currentPage === pageIdx) return 

        const calcPage = Math.floor(pageIdx / PAGINATION_LENGTH);

        SetCurrentPagination(calcPage > 0 ? calcPage : 0);
        
        SetCurrentPage(pageIdx);
    }

    function FirstPageMoveCallback() {
        PageMoveCallback(0);
    }

    function PrevPageMoveCallback() {
        PageMoveCallback(Math.max(currentPage - PAGINATION_LENGTH, 0));
    }

    function NextPageMoveCallback() {
        PageMoveCallback(Math.min(currentPage + PAGINATION_LENGTH, lastPage));
    }

    function LastPageMoveCallback() {
        PageMoveCallback(lastPage-1);
    }

    return {
        PageMoveCallback,
        FirstPageMoveCallback,
        PrevPageMoveCallback,
        NextPageMoveCallback,
        LastPageMoveCallback,
        currentPage,
        paginations,
        currentPagination,
        data : data?.list??[],
        total : data?.total,
        totalPage,
        exhibitionSeq : seq,
    }
}

// [
//     [0, 1, 2, 3, 4],
//     [1, 2, 3, 4, 5],
//     [2, 3, 4, 5, 6],
//     [3, 4, 5, 6, 7],
//     [4, 5, 6, 7, 8],
//     [5, 6, 7, 8, 9],
//     [6, 7, 8, 9, 10],
//     [7, 8, 9, 10, 11],
//     [8, 9, 10, 11, 12],
//     [9, 10, 11, 12, 13],
//     [10, 11, 12, 13, 14],
//     [11, 12, 13, 14, 15],
//     [12, 13, 14, 15, 16],
//     [13, 14, 15, 16, 17],
//     [14, 15, 16, 17, 18],
//     [15, 16, 17, 18, 19],
//     [16, 17, 18, 19, 20],
//     [17, 18, 19, 20, 21],
//     [18, 19, 20, 21, 22],
//     [19, 20, 21, 22, 23],
//     [20, 21, 22, 23, 24],
//     [21, 22, 23, 24, 25],
//     [22, 23, 24, 25, 26],
//     [23, 24, 25, 26, 27],
//     [24, 25, 26, 27, 28],
//     [25, 26, 27, 28, 29],
//     [26, 27, 28, 29, 30],
//     [27, 28, 29, 30, 31],
//     [28, 29, 30, 31, 32],
//     [29, 30, 31, 32, 33],
//     [30, 31, 32, 33, 34],
//     [31, 32, 33, 34, 35],
//     [32, 33, 34, 35, 36],
//     [33, 34, 35, 36, 37],
//     [34, 35, 36, 37, 38],
//     [35, 36, 37, 38, 39],
//     [36, 37, 38, 39],
//     [37, 38, 39],
//     [38, 39],
//     [39],
// ]