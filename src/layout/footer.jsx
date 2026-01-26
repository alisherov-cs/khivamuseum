import { Link } from "react-router-dom";
import { SITE_DATA } from "../constant";
import { MapPinIcon, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTelegram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-bgcolor-secondary pt-20 shadow-xl shadow-t-2 shadow-black/30">
            <div className="container flex flex-wrap pb-18 gap-10">
                <div
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="flex flex-col items-start self-start gap-2 max-w-[260px]"
                >
                    <img
                        src="/images/logo.png"
                        className="h-[90px] object-contain bg-white"
                        alt="Logo"
                    />
                    <h2 className="footer-heading">{t("location")}</h2>
                    <div className="opacity-70">
                        <MapPinIcon className="stroke-white inline size-5 mr-1 mb-1" />
                        <a className="text-white text-sm break-words">
                            {t("address")}
                        </a>
                    </div>
                    <Link className="button font-semibold px-8 mt-10">
                        {t("open_on_map")}
                    </Link>
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="footer-heading mb-5">{t("useful_links")}</h2>
                    <Link to="about" className="text-white py-3 text-sm">
                        {t("home")}
                    </Link>
                    <Link to="gallery" className="text-white py-3 text-sm">
                        {t("about")}
                    </Link>
                    <Link to="news" className="text-white py-3 text-sm">
                        {t("news")}
                    </Link>
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="footer-heading mb-5">{t("useful_links")}</h2>
                    <Link
                        to={`/${language}/tickets`}
                        className="text-white py-3 text-sm"
                    >
                        {t("museum_collection")}
                    </Link>
                    <Link to="nomination" className="text-white py-3 text-sm">
                        {t("gallery")}
                    </Link>
                    <Link to="contact" className="text-white py-3 text-sm">
                        {t("contact")}
                    </Link>
                    <Link
                        to={SITE_DATA.khiva_360}
                        target="_blank"
                        className="text-white py-3 text-sm"
                    >
                        Khiva 360&deg;
                    </Link>
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="footer-heading mb-5">
                        {t("our_social_media")}
                    </h2>
                    <a
                        href={SITE_DATA.socials.instagram}
                        target="_blank"
                        className="flex items-center *:!text-white gap-1 cursor-pointer py-3"
                    >
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="size-5 *:text-white"
                        />
                        <span className="text-inherit text-sm">Instagram</span>
                    </a>
                    <a
                        href={SITE_DATA.socials.facebook}
                        target="_blank"
                        className="flex items-center *:!text-white gap-1 cursor-pointer py-3"
                    >
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="size-5 *:text-white"
                        />
                        <span className="text-inherit text-sm">Facebook</span>
                    </a>
                    <a
                        href={SITE_DATA.socials.telegram}
                        target="_blank"
                        className="flex items-center *:!text-white gap-1 cursor-pointer py-3"
                    >
                        <FontAwesomeIcon
                            icon={faTelegram}
                            className="size-5 *:text-white"
                        />
                        <span className="text-inherit text-sm">Telegram</span>
                    </a>
                    <a
                        href={SITE_DATA.socials.youtube}
                        target="_blank"
                        className="flex items-center *:!text-white gap-1 cursor-pointer py-3"
                    >
                        <FontAwesomeIcon
                            icon={faYoutube}
                            className="size-5 *:text-white"
                        />
                        <span className="text-inherit text-sm">YouTube</span>
                    </a>
                </div>
            </div>
            <div className="border-t border-white/20 border-solid">
                <div className="container py-6">
                    <div className="footer__bottom__list flex! items-center! justify-center! sm:justify-between!">
                        <h4 className="footer__bottom__title__h4 *:text-white">
                            <span data-key="copyright" className="mr-2">
                                {t("copyright")}
                            </span>
                            <a
                                className="*:text-white"
                                href="https://www.limon.group/"
                                rel="nofollow"
                                target="_blank"
                            >
                                <span data-key="developed_by">
                                    {t("developed_by")}
                                </span>
                                <span className="limon pl-1">Limon.uz</span>
                            </a>
                        </h4>
                        <button
                            onClick={scrollToTop}
                            className="border border-gray-500 transition-all group hover:border-primary border-dashed hover:border-solid outline-none rounded-md h-12 w-12 flex items-center justify-center cursor-pointer"
                        >
                            <ArrowUp
                                className="stroke-white tracking-all group-hover:stroke-primary"
                                size={24}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
