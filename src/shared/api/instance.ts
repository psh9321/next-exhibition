import ky, { type Options } from "ky";

import { DataDecrypt, DataEncrypt } from "@/shared/lib/compression";

export const CLIENT_API = ky.create({
    
    prefixUrl : `/api`,
    method : "post",
    timeout : 10000,
    credentials : "include",
    throwHttpErrors : false,
    hooks : {
        beforeRequest : [
            async (req, options) => {

                const opt = options as Options & { body? : string };

                if(!opt.body) throw new Error("request body undefined")

                const headers = new Headers();

                if(process["env"]["NODE_ENV"] === "production") {
                    headers.set("Content-Type", "application/octet-stream")
                    headers.set("Content-Encoding", "gzip")
                }
                else {
                    headers.set("Content-Type", "application/json")
                }

                return new Request(req, {
                    headers,
                    body : DataEncrypt(opt.body)
                })
            }
        ],

        beforeError : [
            async error => {
                return error
            }
        ],

        afterResponse : [
            async ( request, options, response) => {

                const bodyParser = process["env"]["NODE_ENV"] === "production" ? DataDecrypt(await response.arrayBuffer()) : await response.json();

                const result = JSON.stringify(bodyParser);

                const headers = new Headers();
                
                headers.set("Content-Type", "application/json");

                return new Response(result, {
                    status: response.status,
                    headers,
                })
            }
        ],

    }
})

export const OPEN_API = ky.create({
    prefixUrl : process["env"]["NEXT_EXHIBITION_API_URL"],
    timeout : false,
    credentials : "include",
    headers : {
        Accept: 'application/xml',
    },
    hooks : {
        beforeRequest : [
            async req => {
                return req
            }
        ],

        beforeError : [
            async error => {
                return error
            }
        ],

        afterResponse : [
            async ( request, options, response) => {
                return response
            }
        ],
    }
})
