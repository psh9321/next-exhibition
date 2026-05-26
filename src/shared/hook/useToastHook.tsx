"use client"

import { useState } from "react"

import dynamic from "next/dynamic"

interface ALERT_CONFIG {
    title : string,
    contents : string,
    cancelBtnTxt? : string,
    cancelCallback? : () => void
}

interface CONFIRM_CONFIG extends ALERT_CONFIG {
    submitCallback? : () => void
    submitBtnTxt? : string,
}

const Alert = dynamic(() => import('../ui/Toast/Alert').then(m => m.Alert), {ssr : false});

const Confirm = dynamic(() => import('../ui/Toast/Confirm').then(m => m.Confirm), {ssr : false});

export const useToastHook = () => {

    const [ isToastAlert, SetIsToastAlert ] = useState(false);

    const [ isToastConfirm, SetIsToastConfirm ] = useState(false);

    const [ alertConfig, SetAlertConfig ] = useState<ALERT_CONFIG>({
        title : "",
        contents : "",
        cancelBtnTxt : "",
        cancelCallback : () => {}
    });

    const [ confirmConfig, SetConfirmConfig ] = useState<CONFIRM_CONFIG>({
        title : "",
        contents : "",
        cancelBtnTxt : "",
        submitBtnTxt : "",
        cancelCallback : () => {},
        submitCallback : () => {},
    })

    function InitAlert({ title, contents, cancelBtnTxt } : ALERT_CONFIG, _cancelCallback? : () => void) {
        
        SetAlertConfig({
            title,
            contents,
            cancelBtnTxt : cancelBtnTxt??"확인",
            cancelCallback : () => {
                SetIsToastAlert(false);
                _cancelCallback?.()
            }
        });

        SetIsToastAlert(true);
    }

    function InitConfirm({ title, contents, cancelBtnTxt, submitBtnTxt } : CONFIRM_CONFIG, _submitCallback : () => void) {
        SetConfirmConfig({
            title,
            contents,
            cancelBtnTxt : cancelBtnTxt??"취소",
            submitBtnTxt : submitBtnTxt,
            cancelCallback : () => SetIsToastConfirm(false),
            submitCallback : _submitCallback
        });

        SetIsToastConfirm(true);
    }

    const ToastAlert = () => {

        if(!isToastAlert) return <></>

        return <Alert title={alertConfig["title"]} contents={alertConfig["contents"]} cancelBtnTxt={alertConfig["cancelBtnTxt"]} cancelCallback={alertConfig["cancelCallback"]!} />
    }

    const ToastConfirm = () => {
        if(!isToastConfirm) return <></>

        return <Confirm title={confirmConfig["title"]} contents={confirmConfig["contents"]} cancelBtnTxt={confirmConfig["cancelBtnTxt"]} cancelCallback={confirmConfig["cancelCallback"]!} submitCallback={confirmConfig["submitCallback"]!} submitBtnTxt={confirmConfig["submitBtnTxt"]} />
    }

    return { ToastAlert, InitAlert, ToastConfirm, InitConfirm }
}