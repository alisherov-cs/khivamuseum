import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import BreadCrumb from "../../layout/breadcrumb";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export default function About() {
    const {
        t,
        i18n: { language },
    } = useTranslation();
    const [play, setPlay] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);

    const handleClick = () => {
        setPlay(!play);
    };
    const handleClickClose = () => {
        setPlay(!play);
        setIframeKey((prev) => prev + 1);
    };

    return (
        <>
            <div className="overflow-hidden lg:pb-[90px] sm:pb-[60px] pb-[40px]">
                <BreadCrumb title={t("about_museum")} route={[t("home")]} />
                <div className="container ">
                    <div className="flex mt-10 lg:flex-row flex-col gap-7">
                        <div className="flex-1">
                            <h2 className="heading">
                                {t("khiva_museum_title")}
                            </h2>
                            <p className="paragraph desc text-shadow-text!">
                                {t("khiva_museum_about")}
                            </p>
                            <div className="flex items-center justify-start gap-5 mt-10">
                                <Link
                                    to={`/${language}/gallery`}
                                    className="button bg-primary text-xs flex leading-5 items-center gap-2"
                                >
                                    {t("gallery")}
                                    <ChevronRightIcon className="size-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center relative">
                            <div
                                onClick={handleClick}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center animate-bounce active:scale-95 active:animate-none duration-200"
                            >
                                <i className="fa-regular fa-play text-white"></i>
                            </div>
                            <img
                                className="w-full sm:h-[600px] rounded-md!"
                                src="/images/xiva-4.webp"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    play
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                } fixed top-0 w-screen h-screen z-[1002] duration-500 bg-black/80 flex items-center justify-center`}
            >
                <span onClick={handleClickClose}>
                    <i className="fa-regular fa-xmark text-white text-4xl absolute top-[5%] right-[5%]"></i>
                </span>
                <iframe
                    key={iframeKey}
                    className={`lg:w-[50%] sm:w-[70%] sm:h-[60%] h-[50%] w-[80%] relative duration-700 ${
                        play ? "translate-y-[0px]" : "translate-y-[50px]"
                    }`}
                    src="https://www.youtube.com/embed/NDGG3jaYDlc?si=2KcQAeVo1G4XntuZ&amp;start=31"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
        </>
    );
}
