import { StarIcon } from 'lucide-react'
export default function Stars({ quantity = 1, ...icon }) {
    return Array(quantity).fill('').map(item => <StarIcon fill="#fc0" stroke="none" {...icon} />)
}
