export const array_to_object_key = (arr) => {
    return arr.reduce((total, obj) => {
        total[obj.key] = obj
        return total
    }, {})
}