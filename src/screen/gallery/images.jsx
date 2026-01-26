export default function GalleryImages({ images = [], className = "", gap }) {
    const [first, second, third, fourth, fivth, sixth, seventh] = images;

    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${className} gap-${gap}`}
        >
            <div className="grid grid-cols-1 gap-5 h-fit!">
                {first && (
                    <div className="col-span-1 overflow-hidden">
                        <img
                            src={first}
                            className="w-full aspect-square object-cover rounded-md"
                            alt=""
                            loading="lazy"
                        />
                    </div>
                )}
                {fivth && (
                    <div className="col-span-1 overflow-hidden">
                        <img
                            src={fivth}
                            className="w-full aspect-[3/1] object-cover rounded-md"
                            alt=""
                            loading="lazy"
                        />
                    </div>
                )}
                {sixth && (
                    <div className="col-span-1 overflow-hidden">
                        <img
                            src={sixth}
                            className="w-full aspect-[3/1] object-cover rounded-md"
                            alt=""
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-5">
                {second && (
                    <div className="col-span-1 overflow-hidden h-fit!">
                        <img
                            src={second}
                            className="w-full aspect-[2/1] object-cover rounded-md"
                            alt=""
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="col-span-1 grid grid-cols-2 gap-5 flex-1">
                    {[third, fourth].map((img, i) =>
                        img ? (
                            <div key={i} className="col-span-1 overflow-hidden">
                                <img
                                    src={img}
                                    className="w-full aspect-[3/4] object-cover rounded-md"
                                    alt=""
                                    loading="lazy"
                                />
                            </div>
                        ) : null
                    )}
                </div>
                {seventh && (
                    <div className="col-span-1 overflow-hidden h-fit!">
                        <img
                            src={seventh}
                            className="w-full aspect-[2/1] object-cover rounded-md"
                            alt=""
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
