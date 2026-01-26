import {NavLink} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Users} from 'lucide-react'

const Pending = () => {
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [hoveredTicket, setHoveredTicket] = useState(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const tickets = [
        {
            id: 1,
            title: "Qo'riqxona ko'rgazmalari va hududiga kirish",
            subtitle: 'Kattalar uchun',
            price: '25,000',
            currency: 'UZS',
            icon: <Users className='w-6 h-6' />,
            description: "Muzey-qo'riqxona barcha ko'rgazmalari va hududlariga to'liq kirish",
            features: ["🏛️ Barcha ko'rgazmalar", '🚶 Erkin aylanish', '📍 Barcha hududlar'],
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            id: 2,
            title: "Qo'riqxona ko'rgazmalari va hududiga kirish",
            subtitle: 'Kattalar uchun',
            price: '25,000',
            currency: 'UZS',
            icon: <Users className='w-6 h-6' />,
            description: "Muzey-qo'riqxona barcha ko'rgazmalari va hududlariga to'liq kirish",
            features: ["🏛️ Barcha ko'rgazmalar", '🚶 Erkin aylanish', '📍 Barcha hududlar'],
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            id: 2,
            title: "Qo'riqxona ko'rgazmalari va hududiga kirish",
            subtitle: 'Kattalar uchun',
            price: '25,000',
            currency: 'UZS',
            icon: <Users className='w-6 h-6' />,
            description: "Muzey-qo'riqxona barcha ko'rgazmalari va hududlariga to'liq kirish",
            features: ["🏛️ Barcha ko'rgazmalar", '🚶 Erkin aylanish', '📍 Barcha hududlar'],
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            id: 2,
            title: "Qo'riqxona ko'rgazmalari va hududiga kirish",
            subtitle: 'Kattalar uchun',
            price: '25,000',
            currency: 'UZS',
            icon: <Users className='w-6 h-6' />,
            description: "Muzey-qo'riqxona barcha ko'rgazmalari va hududlariga to'liq kirish",
            features: ["🏛️ Barcha ko'rgazmalar", '🚶 Erkin aylanish', '📍 Barcha hududlar'],
            gradient: 'from-blue-400 to-cyan-500'
        }
    ]
    return (
        <div className='flex py-[75px] justify-center'>
            <div className='w-full sm:mx-[5%] flex shadow-[4px_4px_58px_0px_rgba(34,60,80,0.2)] min-h-[450px] bg-white rounded-lg'>
                <div className='lg:w-[75%] w-full'>
                    <h1 className='text-3xl font-medium pb-0 p-7'>Pending</h1>
                    <div className='flex flex-col gap-y-3 mt-5 h-[350px] p-7 overflow-y-auto'>
                        {tickets.map((ticket, index) => (
                            <div
                                key={ticket.id}
                                className={`group relative w-full ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}
                                style={{transitionDelay: `${index * 100}ms`}}
                                onMouseEnter={() => setHoveredTicket(ticket.id)}
                                onMouseLeave={() => setHoveredTicket(null)}
                                onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}>
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${ticket.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>

                                <div
                                    className={`relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                                        selectedTicket === ticket.id
                                            ? 'border-blue-400 shadow-2xl shadow-blue-200'
                                            : 'border-blue-200 hover:border-blue-400'
                                    }`}>
                                    <div className='absolute top-4 right-4 text-4xl opacity-20 animate-pulse'>
                                        {ticket.pattern}
                                    </div>

                                    <div className='p-5 flex md:flex-row-reverse flex-col justify-between items-start'>
                                        <div className='flex items-center justify-between mb-3'>
                                            <div className='text-right'>
                                                <div
                                                    className={`text-3xl font-bold transition-all duration-300 ${
                                                        selectedTicket === ticket.id
                                                            ? 'text-blue-600 scale-110'
                                                            : 'text-blue-700'
                                                    }`}>
                                                    <span className='mr-4 pr-4 border-r-4 border-blue-600'>5X</span>
                                                    <span>{ticket.price}</span>
                                                </div>
                                                <div className='text-sm text-gray-500 font-medium'>
                                                    {ticket.currency}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3
                                                className={`text-xl font-bold mb-2 bg-gradient-to-r ${ticket.gradient} bg-clip-text text-transparent`}>
                                                {ticket.title}
                                            </h3>
                                            <h4 className='text-sm font-medium mb-4 text-orange-600'>
                                                {ticket.subtitle}
                                            </h4>
                                            <div className='space-y-3 mb-6'>
                                                {ticket.features.map((feature, featureIndex) => (
                                                    <div
                                                        key={featureIndex}
                                                        className={`flex items-center text-gray-700 transform transition-all duration-300 ${
                                                            hoveredTicket === ticket.id ? 'translate-x-2' : ''
                                                        }`}
                                                        style={{
                                                            transitionDelay: `${featureIndex * 50}ms`
                                                        }}>
                                                        <div className='w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 mr-3 animate-pulse'></div>
                                                        <span className='text-sm font-medium'>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-5 pt-0 flex sm:flex-row flex-col-reverse gap-y-3 justify-between sm:items-center gap-x-3'>
                                        <button className='sm:py-3 py-[10px] px-6 duration-300 hover:opacity-80 rounded-xl text-base text-white bg-red-600'>
                                            Cancel
                                        </button>
                                        <div className='flex items-center gap-x-3'>
                                            <button className='sm:py-6 py-5 sm:px-16 w-full rounded-xl text-base text-white click-bg'></button>
                                            <button className='sm:py-6 py-5 sm:px-16 w-full border border-blue-400 rounded-xl text-base text-white payme-bg'></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-l-[1px] hidden lg:flex flex-col  w-[25%]'>
                    <div className='flex flex-col p-4 gap-y-4'>
                        <NavLink
                            to='/profile/info'
                            className={({isActive}) =>
                                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                                    isActive ? 'bg-[#3498DB] text-white' : 'bg-white hover:bg-[#3498DB]'
                                }`
                            }>
                            Profile
                        </NavLink>
                        <NavLink
                            to='/profile/pending'
                            className={({isActive}) =>
                                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                                    isActive ? 'bg-[#3498DB] text-white' : 'bg-white hover:bg-[#3498DB]'
                                }`
                            }>
                            Pending
                        </NavLink>
                        <NavLink
                            to='/profile/paid'
                            className={({isActive}) =>
                                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                                    isActive ? 'bg-[#3498DB] text-white' : 'bg-white hover:bg-[#3498DB]'
                                }`
                            }>
                            Paid
                        </NavLink>
                        <NavLink
                            to='/profile/history'
                            className={({isActive}) =>
                                `py-2 px-4 text-base font-medium w-full rounded-full duration-200 text-black hover:text-white ${
                                    isActive ? 'bg-[#3498DB] text-white' : 'bg-white hover:bg-[#3498DB]'
                                }`
                            }>
                            History
                        </NavLink>
                    </div>
                    <div className='flex items-center justify-between hover:bg-gray-100 duration-200 mt-auto py-3 px-8 border-t-[1px]'>
                        <span>LogOut</span>
                        <span className='fa-regular fa-right-to-bracket'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pending
