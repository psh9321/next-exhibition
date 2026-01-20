export function ExhibitionDateFormat(dateNo : number | string) : string {

    if(typeof dateNo === "number" && dateNo <= 0) return "-999";

    const dateStr = String(dateNo);

    if(dateStr.length < 8) return dateStr;

    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8)
    
    return `${year}.${month}.${day}`
}

export function GetNextDateFormat() : string {
    
    const date = new Date();

    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return `${year}${month}${day}`
}