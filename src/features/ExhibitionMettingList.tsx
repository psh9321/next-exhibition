"use client"

import Image from "next/image"

export const ExhibitionMettingList = () => {
    return (
        <ol>
            <li>
                <dl>
                    <dt>테스트 모임</dt>
                    <dd>2026.07.11 (수) 14:30</dd>
                    <dd>3 / 5 명</dd>
                </dl>
                <ul>
                    <li>
                        <button>
                            <Image width={36} height={36} src={"/user.profile.null.png"} alt="dd" />
                        </button>
                    </li>
                </ul>
            </li>
        </ol>
    )
}