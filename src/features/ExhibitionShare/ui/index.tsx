"use client"

import { decode } from 'he';

import { Share2 } from 'lucide-react';
import { KakaoShareModel } from "../model/share.model";

export const ExhibitionShare = ({ item } : { item : EXHIBITION_DETAIL_ITEM }) => {
    
    function OnShareKaKaoCallback() {
        if(!window.Kakao.Share.sendDefault) return console.log("Kakao SDK load failed");

        const shareModel = new KakaoShareModel(item);

        window.Kakao.Share.sendDefault(shareModel)
    }

    return (
        <button title={`"${decode(item["title"])}" 카카오톡 공유`} onClick={OnShareKaKaoCallback}><Share2/></button>
    )
}