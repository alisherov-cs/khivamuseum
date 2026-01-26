import React from 'react'

export default function CardCity({ city }) {
    return <div key={city.id} className="flex-[1_1_340px] relative h-[340px] rounded-lg overflow-hidden shadow-lg group">
        <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex flex-col p-6">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full self-end">
                Tavsiya etilgan
            </div>
            <div className='flex-1'></div>
            <h3 className="text-white text-2xl font-bold mb-2">{city.translate.name}</h3>
            <p className="text-white mb-4">{city.map}</p>
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                Shartnomani ko'rish
            </button>
        </div>
        <img
            className='absolute -z-10 top-0 left-0 w-full h-full object-cover object-center transition duration-700 group-hover:scale-110'
            src={city.images[0]}
            alt={city.title}
        />
    </div>
}
