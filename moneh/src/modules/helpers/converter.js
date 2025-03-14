import { commaThousandFormat } from "./math"

export const ucFirstChar = (val) => {
    try {
        return val.charAt(0).toUpperCase() + val.slice(1)
    } catch (error) {
        throw error
    }
}

export const ucFirstWord = (val) => {
    try {
        const words = val.split(' ')
        const caps = words.map(wd => {
            return wd.charAt(0).toUpperCase() + wd.slice(1)
        });
        const res = caps.join(' ')

        return res
    } catch (error) {
        throw error
    }
}

export const cleanSlugToText = (val) => {
    try {
        const res = ucFirstWord(val.replace('_',' '))

        return res
    } catch (error) {
        throw error
    }
}

export const datetimeLocal = (val) => {
    try {
        let [date, time] = val.split(' ')
        time = time.substring(0, 5)

        return `${date}T${time}`
    } catch (error) {
        throw error
    }
}

export const getBoolCheck = (val) => {
    try {
        if(val === "on"){
            return 1
        } else {
            return 0
        }
    } catch (error) {
        throw error
    }
}

export const getCleanTitleFromCtx = (val) => {
    try {
        const newVal = val.replaceAll('_', ' ')
        const cap = newVal.split(" ").
            map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        
        return cap
    } catch (error) {
        throw error
    }
}

export const convertDatetime = (val, type) => {
    try {
        if(val){
            const result = new Date(val)
    
            if (type === "full") {
                const now = new Date(Date.now())
                const yesterday = new Date()
                const tomorrow = new Date()
                yesterday.setDate(yesterday.getDate() - 1)
                tomorrow.setDate(tomorrow.getDate() + 1)
                
                if (result.toDateString() === now.toDateString()) {
                    return ` today_at ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else if (result.toDateString() === yesterday.toDateString()) {
                    return ` yesterday_at ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else if (result.toDateString() === tomorrow.toDateString()) {
                    return ` tommorow_at ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else {
                    return ` ${result.getFullYear()}/${(result.getMonth() + 1)}/${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                }
            } else if (type === "24h" || type === "12h") {
                return `${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`;
            } else if (type === "datetime") {
                return ` ${result.getFullYear()}/${(result.getMonth() + 1)}/${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
            } else if (type === "date") {
                return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}`
            } else if (type === "calendar") {
                const result = new Date(val)
                const offsetHours = getUTCHourOffset()
                result.setUTCHours(result.getUTCHours() + offsetHours)
            
                return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}:00`
            }        
        } else {
            return "-"
        }
    } catch (error) {
        throw error
    }
}

export const getUTCHourOffset = (val, type) => {
    try {
        const offsetMi = new Date().getTimezoneOffset()
        const res = -offsetMi / 60
        return res
    } catch (error) {
        throw error
    }
}

export const removeHTMLTags = (val) => {
    try {
        if ((val === null) || (val ==='')){
            return "<span className='fst-italic'>No description provided</span>"
        } else {
            val = val.toString()
        }
            
        return val.replace( /(<([^>]+)>)/ig, '')
    } catch (error) {
        throw error
    }
}

export const convertSignedNumber = (num, ctx) => {
    if(ctx === "+"){
        if(num < 0){
            return num * -1
        } else {
            return num
        }
    } else if (ctx === "-"){
        if(num > 0){
            return num * -1
        } else {
            return num
        }
    } else {
        return false
    }
}

export const numberToPrice = (val) => {
    try {
        if (val >= 1000) {
            const res = (val / 1000).toFixed(0)
            return res + 'K'
        } else {
            return val.toString()
        }
    } catch (error) {
        throw error
    }
}

export const formatCurrency = (val) => {
    const currency_type = sessionStorage.getItem("currency_type") ?? 'Abbreviated Numeral'

    if(currency_type === 'Abbreviated Numeral'){
        return `Rp. ${numberToPrice(val)}`
    } else if(currency_type === 'Rupiah' || currency_type === 'Rupiah With Zero Sen'){
        return `Rp. ${commaThousandFormat(val)}${currency_type === 'Rupiah With Zero Sen' && '.00'}`
    } else if(currency_type === 'Rupiah Without Format'){
        return `Rp. ${val}`
    }
}