import IMAGE from '../../assets/route.jpg'
import { ChevronRightIcon } from 'lucide-react'

export default function RouteTitle({ route = ['Asosiy'] }) {
    return <div className="relative pt-[var(--navHeight)] flex flex-col items-center justify-center py-10">
        <div className='absolute left-0 top-0 right-0 bottom-0 bg-cover bg-bottom z-0' style={{ backgroundImage: `url(${IMAGE})` }}></div>
        <span className='z-10'>{
            route.join('/')
        }</span>
    </div>
}
