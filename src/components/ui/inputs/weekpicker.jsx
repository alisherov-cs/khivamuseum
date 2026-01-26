import FormInput from "./input";
import { format_time } from '../../../helper/input_format'
import { week_days } from "../../../constant";
import { useEffect } from "react";

export default function WeeklySchedule({ state, defaultValue }) {
    const [times, setTimes] = state
    useEffect(() => {
        if(defaultValue) setTimes(defaultValue)
    }, [defaultValue])


const handleInputChange = (e, index, field) => {
    const { value } = e.target;

    const formated = format_time(value)
    const isExist = Object.values({ ...times[index], [field]: formated }).join('')
    
    if(isExist) {
        setTimes((prev) => {
            return {
                ...prev,
                [index]: {  
                    ...prev[index],
                    [field]: formated
                }
            }   
        });
    } else if(!isExist) {
        setTimes((prev) => {
            const updatedTimes = { ...prev };
            delete updatedTimes[index];
            return updatedTimes; 
        });
    }
};

    return week_days.map((day, index) => {
        return <div
            key={index}
            className="flex items-center gap-x-4 gap-y-1 flex-wrap"
        >
            <span className="w-28 font-medium">{day}</span>
            <div className="flex items-center gap-4 flex-wrap">
                <FormInput
                    className="!w-[7.5ch]"
                    placeholder='00:00'
                    name='start'
                    value={times[index]}
                    onChange={(e) =>
                        handleInputChange(e, index, "start")
                    }
                />
                <span>-</span>
                <FormInput
                    className="!w-[7.5ch]"
                    placeholder='00:00'
                    name='end'
                    value={times[index]}
                    onChange={(e) =>
                        handleInputChange(e, index, "end")
                    }
                />
            </div>
        </div>
    })
}
