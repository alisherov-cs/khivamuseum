export const priceFormat = (number, unit_none) => {
    const unit = unit_none ? '' : ' UZS'
    number = parseInt(number)
    if (!number) {
        return 0 + unit
    }
    const res = number.toLocaleString().replaceAll(',', ' ') + unit
    return res
}
