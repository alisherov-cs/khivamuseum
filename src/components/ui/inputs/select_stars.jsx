import  { StarIcon } from 'lucide-react'
import { useState } from 'react'
import { COLORS } from '../../../constant'

export default function SelectStars({ onChange, className = '', star_count = 5 }) {
    const [ stars, setStars ] = useState(0)
    const click = (number) => {
        const changed = number === stars ? 0 : number
        onChange(changed)
        setStars(changed)        
    }

    return <div className={`flex flex-row ${className}`}>
        { Array(star_count).fill('').map((_, index) => {
            return <button type='button' className='px-0.5' onClick={() => click(index+1)}>
                <StarIcon className='stroke-yellow-500' fill={ index < stars ? COLORS.primary : 'transparent' } />
            </button>
        }) }
    </div>
}
