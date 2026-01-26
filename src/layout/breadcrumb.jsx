import { ChevronRightIcon } from "lucide-react";

export default function BreadCrumb({
    title = "",
    route = [],
    route_last = true,
}) {
    return (
        <div className="pt-10 pb-5">
            <div className="container flex flex-col gap-5 items-start justify-center">
                <div className="border flex flex-col gap-2 items-center justify-center py-3 w-full sm:w-fit px-4 sm:px-20 rounded-md border-primary border-dashed">
                    <h1 className="heading text-primary! text-3xl!">{title}</h1>
                    <span className="flex items-center gap-3 sm:gap-8 p-0!">
                        {route.map((r, i) => {
                            return (
                                <>
                                    <span className="text-white text-sm">
                                        {r}
                                    </span>
                                    <div className="p-0!">
                                        <ChevronRightIcon
                                            size={24}
                                            strokeWidth={1}
                                            className="p-0!"
                                        />
                                    </div>
                                </>
                            );
                        })}
                        {route_last && (
                            <span className="text-white text-sm">{title}</span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
