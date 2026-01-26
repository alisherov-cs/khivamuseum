import DECORATION from '../../assets/decoration.svg'
import DECORATION1 from '../../assets/decoration1.svg'

export default function DecorationSection({children, className = '', decoration = 0, ...more}) {
    return (
        <section className={`relative bg-slate-500/5 overflow-hidden ${className}`} {...more}>
            {decoration !== 3 ? (
                <img
                    className='w-full max-h-full absolute left-0 bottom-0 -z-20'
                    src={decoration === 0 ? DECORATION : DECORATION1}
                    alt='decoration'
                />
            ) : (
                <svg className='w-full max-h-full absolute left-0 bottom-0 -z-20' width='100%' height='100%'>
                    <pattern id='pattern' width='40' height='40' patternUnits='userSpaceOnUse'>
                        <path
                            className='stroke-primary/30 dark:stroke-white/[5%]'
                            fill='none'
                            strokeWidth='1'
                            d='M0 20 C10 -5, 30 -5, 40 20 C30 45, 10 45, 0 20 Z'
                        />
                    </pattern>
                    <rect width='100%' height='100%' fill='url(#pattern)' />
                </svg>
            )}
            {children}
        </section>
    )
}
