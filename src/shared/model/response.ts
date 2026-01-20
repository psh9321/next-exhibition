class ResponseModel<T> implements RESPONSE_MODEL<T> {
    resultCode : number;
    data : T | null ;
    errMsg : string;  
    
    constructor() {
        this.resultCode = 0;
        this.data = null;
        this.errMsg = "";
    }
}

export class ApiSuccess<T> extends ResponseModel<T> {
    constructor(data : T) {
        super();

        this.resultCode = 200;
        this.data = data;
    }
}

export class ApiFail<T> extends ResponseModel<T> {
    constructor(data : any , msg : string) {
        super();

        this.resultCode = 403;
        this.data = data;
        this.errMsg = msg;
    }
}

export class ApiError<T> extends ResponseModel<T> {
    constructor(data : T, msg : string) {
        super();

        this.resultCode = 500;
        this.data = data;
        this.errMsg = msg;
    }
}

