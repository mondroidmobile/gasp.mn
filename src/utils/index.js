/**
 * тооны өмнө 0 ээр дүүргэж өгөх нь
 * @param {number} num тоо
 * @param {number} spliceNo
 * @returns 0 ээр дүүрсэн тоо
 */
export const fullZero = (num, spliceNo=-2) => ("0" + num).slice(spliceNo)

/**
 * timezone ийг string date болгох
 * @param {string | number} timezone    date
 * @param {boolean}         hasHour     цагийг хамтад нь авах эсэх
 * @param {string}          symbol      өдрийн голд байх тэмдэгт
 * @returns бүтэн string date
 */
export function timeZoneToDateString(timezone, hasHour=true, symbol="-", hasMs=false)
{
    const date = new Date(timezone)

    /** сар */
    const month = fullZero(date.getMonth() + 1)
    /** өдөр */
    const day = fullZero(date.getDate())
    /** жил */
    const year = date.getFullYear()

    /** цаг */
    const hour = fullZero(date.getHours())
    /** минут */
    const minute = fullZero(date.getMinutes())
    /** с */
    const seconds = fullZero(date.getSeconds())
    /** мс */
    const ms = date.getMilliseconds()

    const hours = `${hour}:${minute}:${seconds}${hasMs ? `:${ms}` : ""}`

    const full = `${year}${symbol}${month}${symbol}${day}${hasHour ? " " + hours : ""}`

    return full
}

/** mill second ийг string хугацаа руу хөрвүүлэх */
export function msToTime(ms)
{

    let time = ms
    let text = "ms"

    if (ms > 1000)
    {
        time = parseFloat(ms) / 1000
    }
    if (time > 60)
    {
        time = parseFloat(time) / 60
        text = "min"
    }
    if (time >= 60)
    {
        time = parseFloat(time) / 60
        text = "h"
    }

    return `${time}${text}`

}

/** Тухайн тоог string болгох */
export function numberToString(number)
{
    let dividedNumber = parseFloat(number)
    let string = ""

    if (1e6 > dividedNumber >= 1e3)
    {
        dividedNumber = dividedNumber / 1e3
        string = "K"
    }
    else if (1e9 > dividedNumber >= 1e6)
    {
        dividedNumber = dividedNumber / 1e6
        string = "M"
    }
    else if (dividedNumber >= 1e9) {
        dividedNumber = dividedNumber / 1e9
        string = "B"
    }

    return `${dividedNumber}${string}`
}

/** Өнөөдрөөс тухайн өдрийг хасах */
export function minusDate(start, end=Date.now())
{
    const parsedStart = Date.parse(start)
    const zuruuMs = end - parsedStart
    let time = null
    let string = ''
    if (zuruuMs >= 1000)
    {
        time = Math.floor(parseFloat(zuruuMs) / 1000)
        string = "seconds ago"
    }
    if (time >= 60)
    {
        time =  Math.floor(parseFloat(time) / 60)
        string = "minutes ago"
    }
    if (time >= 60)
    {
        time =  Math.floor(parseFloat(time) / 60)
        string = "hours ago"
    }
    if (time >= 24)
    {
        time =  Math.floor(parseFloat(time) / 24)
        string = "days ago"
    }
    if (time >= 30)
    {
        time =  Math.floor(parseFloat(time) / 24)
        string = "months ago"
    }

    return `${time} ${string}`

}

export function getImageFormUrl(url, callback) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function (a) {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURI = canvas.toDataURL("image/jpg");
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return callback(new FileList(new File([ia], { type: mimeString })));
    }
    img.src = url;
  }
