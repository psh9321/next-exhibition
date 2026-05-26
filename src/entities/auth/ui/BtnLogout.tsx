"use client"

import { LogoutCallback } from '../util/logout';

export const BtnLogout = () => {

    return (
        <button onClick={LogoutCallback}>로그아웃</button>
    )
}