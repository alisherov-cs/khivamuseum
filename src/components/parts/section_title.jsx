export default function SectionTitle({children, decoration = true, className = '', ...more}) {
    return (
        <h1
            className={`text-primary mb-8 max-lg:mb-7 max-md:mb-6 max-sm:mb-4 relative font-merienda flex flex-col items-center text-center text-3xl max-sm:text-2xl uppercase font-bold ${className}`}
            {...more}>
            {children}
            {decoration && (
                <svg className='max-w-[200px] z-0' xmlns='http://www.w3.org/2000/svg' viewBox='100 40 600 100'>
                    <path
                        d='M150,75 C170,55 190,65 185,85 C180,105 160,95 150,75 Z'
                        fill='rgb(44, 131, 66)'
                        opacity='0.9'
                    />
                    <path d='M185,85 Q220,75 250,85' stroke='rgb(44, 131, 66)' stroke-width='2.5' fill='none' />
                    <circle cx='220' cy='70' r='5' fill='rgb(44, 131, 66)' opacity='0.8' />

                    <path
                        d='M650,75 C630,55 610,65 615,85 C620,105 640,95 650,75 Z'
                        fill='rgb(44, 131, 66)'
                        opacity='0.9'
                    />
                    <path d='M615,85 Q580,75 550,85' stroke='rgb(44, 131, 66)' stroke-width='2.5' fill='none' />
                    <circle cx='580' cy='70' r='5' fill='rgb(44, 131, 66)' opacity='0.8' />

                    <path d='M280,100 Q400,115 520,100' stroke='rgb(44, 131, 66)' stroke-width='2.5' fill='none' />
                    <ellipse cx='400' cy='110' rx='30' ry='10' fill='rgb(44, 131, 66)' opacity='0.7' />
                    <path d='M385,110 Q400,105 415,110' stroke='rgb(44, 131, 66)' stroke-width='1' fill='none' />
                    <path d='M380,110 Q400,115 420,110' stroke='rgb(44, 131, 66)' stroke-width='1' fill='none' />
                </svg>
            )}
        </h1>
    )
}
