const options = {
    date: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    },
    time: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }
}

export const format_date = (date, {format = 'date'} = {}) => {
    if (!date) return
    const dateObject = new Date(date)

    if (Array.isArray(format)) {
        return format
            .map(t => {
                const formatted = new Intl.DateTimeFormat('ru-RU', options[t]).format(dateObject)
                return formatted.replaceAll(',', '')
            })
            .join(' ') // Bo'sh joy bilan ajratib qo'yamiz
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options[format]).format(dateObject)
    return formattedDate.replaceAll(',', '')
}
