import { Calendar, FlagIcon } from "lucide-react";

export default function CardEmployee({ data }) {
    return (
        <div className="group hover:shadow-xl rounded-lg border border-border flex flex-col cursor-pointer">
            <div className="relative w-full flex items-center overflow-hidden! justify-center bg-bgcolor-secondary h-[320px] rounded-lg rounded-b-none! border-b border-border">
                <img
                    className={`w-[150px] aspect-2/3 rounded-sm! z-20`}
                    src={data.image}
                    alt="news"
                />
            </div>
            <div className="p-4 space-y-3 flex-1 flex relative overflow-hidden flex-col justify-between">
                <img
                    src="/images/gerb.svg"
                    className="absolute w-8 h-8 top-3 right-3"
                />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 opacity-85">
                        <span className="flex gap-2 items-center text-sm">
                            <FlagIcon className="size-5" strokeWidth={1.5} />
                            {data.nation}
                        </span>
                        <span className="flex gap-2 items-center text-sm">
                            <Calendar className="size-5" strokeWidth={1.5} />
                            {data.birthday}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 my-5">
                        <h1 className="line-clamp-3 font-semibold">
                            {data.fullName}
                        </h1>
                        <p className="text-shadow-text">{data.role}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center group-hover:bg-primary rounded-full w-12 h-12 transition-all duration-300 bg-transparent">
                    <svg
                        className="transition-all group-hover:-rotate-45 fill-primary group-hover:fill-white duration-300"
                        width="30"
                        height="12"
                        viewBox="0 0 41 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M40.5303 6.53033C40.8232 6.23744 40.8232 5.76256 40.5303 5.46967L35.7574 0.696699C35.4645 0.403806 34.9896 0.403806 34.6967 0.696699C34.4038 0.989593 34.4038 1.46447 34.6967 1.75736L38.9393 6L34.6967 10.2426C34.4038 10.5355 34.4038 11.0104 34.6967 11.3033C34.9896 11.5962 35.4645 11.5962 35.7574 11.3033L40.5303 6.53033ZM0 6.75H40V5.25H0V6.75Z"
                            fill="inherit"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
