import {useEffect, useRef, useState} from 'react'

const Timer = ({start = Date.now(), end, interval = 1000, onFinish, render, ...rest}) => {
    const [remaining, setRemaining] = useState(() => Math.max(0, +new Date(end) - Date.now()))
    const finished = remaining <= 0
    const timerRef = useRef()
    const calledFinish = useRef(false)

    useEffect(() => {
        if (finished && onFinish && !calledFinish.current) {
            calledFinish.current = true
            onFinish()
        }
        if (!finished) {
            timerRef.current = setInterval(() => {
                setRemaining(() => {
                    const next = Math.max(0, +new Date(end) - Date.now())
                    if (next <= 0) clearInterval(timerRef.current)
                    return next
                })
            }, interval)
            return () => clearInterval(timerRef.current)
        } else {
            clearInterval(timerRef.current)
        }
    }, [finished, interval, onFinish, end])

    const total = +new Date(end) - +new Date(start)
    const percent = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0

    // Default render: mm:ss
    const defaultRender = () => {
        const sec = Math.floor(remaining / 1000) % 60
        const min = Math.floor(remaining / 60000) % 60
        const hr = Math.floor(remaining / 3600000)
        return (
            <span>
                {hr > 0 && String(hr).padStart(2, '0') + ':'}
                {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
            </span>
        )
    }

    return <span {...rest}>{render ? render({remaining, percent, isFinished: finished}) : defaultRender()}</span>
}

export default Timer
