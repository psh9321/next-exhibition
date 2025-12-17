import ky from "ky";

export const CLIENT_API = ky.create({
    
    prefixUrl : `/api`,
    method : "post",
    timeout : 10000,
    credentials : "include",
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
