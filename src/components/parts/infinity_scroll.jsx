export default function ScrollHorizontal({children, reverse, duration = 60, from = 0, to = '-100%', className = ''}) {
    return (
        <div className={`flex justify-center w-full overflow-hidden relative group ${className}`}>
            {Array(4)
                .fill('')
                .map(() => {
                    return (
                        <div
                            style={{animationDuration: `${duration}s`}}
                            className={`${
                                reverse ? 'animation-swipe-reverse' : 'animation-swipe'
                            } flex group-hover:[animation-play-state:paused]`}>
                            {children}
                        </div>
                    )
                })}
        </div>
    )
}
