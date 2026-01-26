import { week_days } from "../../constant"

export default function ViewWeekDays({ data = {}, className = '', ...more }) {
    return <div className={`flex gap-1 flex-wrap ${ className }`} {...more}>{
        Object.keys(data).map(index => {
            const day = week_days[index]
            return <span className="status">
                { day.slice(0, 2) + ' ' }
                { (data[index]?.start ?? "yo'q") + ' ' }
                -
                { ' ' + (data[index]?.end ?? "yo'q") }
            </span>
        })    
    }</div>
}
