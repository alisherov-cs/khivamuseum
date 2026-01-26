import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import HomeNews from "./news";
import Counter from "../../components/ui/counter";
import GalleryImages from "../gallery/images";
import { expositions, gallery, monuments, slides, stats } from "../../constant";
import useFetch from "../../hooks/useFetch";
import Exhibits from "./exhibits";
import { useRef } from "react";

export default function Home() {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    // const { data, loading } = useFetch("exhibits");

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);

    return (
        <>
            <div className="container mt-8">
                <div className="w-full rounded-2xl overflow-hidden relative lg:mb-[90px] sm:mb-[60px] mb-[40px]">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        navigation={{
                            nextEl: nextRef.current,
                            prevEl: prevRef.current,
                        }}
                        pagination={{
                            el: paginationRef.current,
                            clickable: true,
                        }}
                        autoplay={{ delay: 8000 }}
                        effect="fade"
                        loop
                        className="lg:!h-[575px] sm:!h-[450px] !h-[350px]"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                className="bg-cover bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url("${slide.image}")`,
                                    backgroundColor:
                                        "linear-gradient(0deg, rgba(27, 32, 42, 0.5), rgba(27, 32, 42, 0.5))",
                                }}
                            >
                                <div className="relative w-full h-full">
                                    <div className="bg-black/40 w-full h-full"></div>
                                    <div className="absolute bottom-10 left-10 flex flex-col justify-center *:text-white *:!stroke-white">
                                        <h2 className="heading lg:!text-5xl sm:!text-[40px] !text-2xl  tracking-wide uppercase">
                                            {t(slide.title)}
                                        </h2>
                                        <div className="mt-4 flex items-center gap-2 ">
                                            <div className="w-10 h-[2px] bg-white rounded-full" />
                                            <MapPinIcon className="stroke-inherit scale-80" />
                                            <p className="lg:text-lg sm:!text-base !text-sm md:text-xl text-white">
                                                {t(slide.location)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="mt-5 w-full flex items-center  justify-center gap-x-5">
                        {/* Custom navigation buttons */}
                        <div
                            ref={prevRef}
                            className="btn-prev shrink-0 w-10 h-10 rounded-md bg-primary cursor-pointer flex items-center justify-center"
                        >
                            <ChevronLeftIcon color="white" />
                        </div>

                        {/* Custom pagination dots */}
                        <div
                            ref={paginationRef}
                            className="pagination relative! top-0! right-0! left-0! bottom-0! w-fit! flex gap-3 z-10"
                        ></div>

                        <div
                            ref={nextRef}
                            className="btn-next shrink-0 w-10 h-10 rounded-md bg-primary cursor-pointer flex items-center justify-center"
                        >
                            <ChevronRightIcon color="white" />
                        </div>
                    </div>
                </div>
            </div>
            <section className="container ">
                <div className="flex lg:mb-[90px] sm:mb-[60px] mb-[40px] lg:flex-row flex-col-reverse gap-7">
                    <div className="flex-1">
                        <h2 className="heading">{t("khiva_museum_title")}</h2>
                        <p className="paragraph desc text-shadow-text!">
                            {t("khiva_museum_about")}
                        </p>
                        <div className="flex items-center justify-start gap-5 mt-10">
                            <Link className="button flex items-center gap-2">
                                {t("tickets")}
                                <img
                                    src="/icons/tickets.svg"
                                    alt="ticket icon"
                                />
                            </Link>
                            <Link
                                to={`/${language}/about`}
                                className="button bg-transparent border border-dashed border-primary text-primary text-xs flex leading-5 items-center gap-2"
                            >
                                {t("more_details")}
                                <ChevronRightIcon className="size-4 stroke-primary" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            className="w-full sm:h-[600px]"
                            src="/images/xiva-4.webp"
                            alt=""
                        />
                    </div>
                </div>
            </section>
            {/* Exibits */}
            {/*

            {!loading && (
                <section className="container ">
                    <div className="lg:mb-[90px] sm:mb-[60px] mb-[40px]">
                        <h2 className="heading">{t("exposition_title")}</h2>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                            {data.items?.map((exp) => {
                                return <Exhibits key={exp.id} exp={exp} />;
                            })}
                        </div>
                    </div>
                </section>
            )}
                */}
            <section className="lg:mb-[90px] sm:mb-[60px] mb-[40px] relative">
                <div className="max-w-[1800px] mx-auto px-4 relative lg:py-[60px] sm:py-20 py-5 z-10">
                    <div className="flex flex-wrap bg-bgcolor-secondary rounded-3xl">
                        {stats.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="lg:flex-1 sm:w-1/2 w-full text-2xl px-10 py-8 sm:border-r border-b sm:even:border-r-0 md:even:border-r-0 lg:even:border-r sm:border-b-0 md:odd:border-r lg:nth-[1]:border-b-0 lg:nth-[2]:border-b-0 sm:nth-[1]:border-b sm:nth-[2]:border-b md:nth-[1]:border-b md:nth-[2]:border-b last:border-none border-glow_color flex flex-col items-center text-center *:text-white"
                                >
                                    <div className="border border-white rounded-full p-[15px]">
                                        <img
                                            className="h-[30px] aspect-square"
                                            src={item.icon}
                                            alt=""
                                        />
                                    </div>
                                    <h3 className="mt-4 text-primary! text-base font-medium">
                                        {t(item.title)}
                                    </h3>
                                    <Counter
                                        to={item.number}
                                        className="text-3xl mt-auto text-gray-300! font-semibold pt-3"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <div className="lg:mb-[90px] sm:mb-[60px] mb-[40px]">
                <div className="flex items-center justify-center flex-col gap-3 mb-20 px-4">
                    <h1 className="text-4xl text-primary text-center">
                        Xorazm madaniy merosi kolleksiyasi
                    </h1>
                    <p className="text-base text-center max-w-[1000px] text-shadow-text">
                        Xiva muzeyining boy to'plamida asrlar davomida saqlanib
                        kelgan noyob eksponatlar namoyish etilmoqda. An'anaviy
                        keramika, milliy kiyimlar va qadimiy qurol-yarog'lar
                        orqali Xorazm xalqining tarixini va madaniyatini kashf
                        eting.
                    </p>
                </div>
                <section className="container  space-y-[60px]">
                    {monuments.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center lg:flex-row lg:h-[350px] flex-col gap-8`}
                            >
                                <div className="flex items-center justify-center">
                                    <img
                                        className="lg:h-[350px] aspect-video lg:aspect-square !object-cover rounded-lg"
                                        src={item.image}
                                        alt=""
                                    />
                                </div>
                                <div className="lg:flex-1 w-full h-full flex flex-col justify-between py-8">
                                    <div className="flex-1 border-b border-glow_color pb-5 lg:pb-0">
                                        <h2 className="heading text-text text-3xl font-semibold text-center lg:text-start">
                                            {t(item.title)}
                                        </h2>
                                        <p className="paragraph desc text-shadow-text!">
                                            {t(item.desc)}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-start gap-5 mt-10 self-center lg:self-start">
                                        <Link className="button bg-transparent border border-dashed transition-all group hover:bg-primary hover:border-solid hover:text-text border-primary text-primary text-xs flex items-center gap-2">
                                            {t("more_details")}
                                            <ChevronRightIcon className="size-4 stroke-primary transition-all group-hover:stroke-text" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            <section className="pt-10 overflow-hidden relative">
                <div className="container *:text-white">
                    <div className="flex items-end absolute bottom-0 justify-center w-full h-[500px]"></div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="heading text-white">{t("gallery")}</h2>
                        <Link
                            to={`/${language}/gallery`}
                            className="button bg-transparent border border-dashed transition-all group hover:bg-primary hover:border-solid hover:text-text border-primary text-primary text-xs flex items-center gap-2"
                        >
                            {t("more_details")}
                            <ChevronRightIcon className="size-5 transition-all group-hover:stroke-text stroke-primary" />
                        </Link>
                    </div>
                    <GalleryImages images={gallery.slice(0, 7)} />
                </div>
            </section>

            <HomeNews />
        </>
    );
}
