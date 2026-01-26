export const format_phone_number = (value) => {
    const x = String(value).replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    
    return (x[1] ? '+' : '') + (!x[2] ? x[1] : x[1] + " ") + (!x[3] ? x[2] : '(' + x[2] + ') ') + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
}


export const format_time = (value) => {
    const x = String(value).replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/);
    if (!x) return "";

    let hours = x[1] || "";
    let minutes = x[2] || "";

    if (hours > 23) hours = "23";
    if (minutes > 59) minutes = "59";

    return `${hours}${minutes ? ":" + minutes : ""}`;
};