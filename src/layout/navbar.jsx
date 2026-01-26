import { Link, NavLink } from "react-router-dom";
import { navLinks, SITE_DATA } from "../constant";
import { useTranslation } from "react-i18next";
import { ChevronDown, MailIcon, PhoneIcon, User } from "lucide-react";
import {
    faInstagram,
    faTelegram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LangChanger from "../components/parts/lang_changer";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Glass from "../components/icons/glass";
import { useSelector } from "react-redux";
import { getUser } from "../store/user";
export default function Navbar({ open, setOpen }) {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const { user, token } = useSelector(getUser);

    const navRef = useRef(null);
    const headerRef = useRef(null);
    const updateNavHeight = () => {
        if (navRef.current) {
            document.body.style.setProperty(
                "--nav-height",
                `${headerRef.current.offsetHeight + navRef.current.offsetHeight}px`
            );
        }
    };

    useLayoutEffect(() => {
        updateNavHeight();
        const handleResize = () => {
            updateNavHeight();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div ref={headerRef}>
                <header className="bg-bgcolor-secondary border-0 border-b border-border border-solid">
                    <div className="container flex items-center px-5 py-2">
                        <div className="flex-1 md:flex hidden items-center xl:gap-x-5 gap-x-2">
                            <div>
                                <Link target="_self" to={`/${language}/home`}>
                                    <img
                                        className="h-[70px] "
                                        src="/images/logo.png"
                                        alt=""
                                    />
                                </Link>
                            </div>

                            <div className="lg:flex hidden">
                                <Link
                                    className="flex items-center gap-x-2 text-black"
                                    to="https://khiva360.nazzar.uz/"
                                >
                                    <Glass className="fill-white" />
                                    <span className="text-sm">Khiva 360°</span>
                                </Link>
                            </div>
                            <div className="lg:flex hidden">
                                <Link
                                    className="flex items-center gap-x-2 text-black"
                                    to="https://khivamuseumshop.uz/main/home"
                                >
                                    <span>
                                        <i className="fa-brands fa-shopify"></i>
                                    </span>
                                    <span className="text-sm">
                                        Khiva Museum Shop
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-5">
                            <div className="md:flex hidden items-center">
                                <Link
                                    to={`${SITE_DATA.socials.youtube}`}
                                    className="flex items-center p-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faYoutube}
                                        className="size-4"
                                    />
                                </Link>
                                <Link
                                    to={`${SITE_DATA.socials.instagram}`}
                                    className="flex items-center p-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="size-4"
                                    />
                                </Link>
                                <Link
                                    to={`mailto: ${SITE_DATA.email}`}
                                    className="flex items-center p-2"
                                >
                                    <MailIcon className="size-4" />
                                </Link>
                                <Link
                                    to={`tel: ${SITE_DATA.phone}`}
                                    className="flex items-center p-2 gap-1"
                                >
                                    <PhoneIcon className="size-4" />
                                    <span className="lg:flex hidden">
                                        {SITE_DATA.phone}
                                    </span>
                                </Link>
                            </div>

                            <div className="cursor-pointer">
                                <LangChanger />
                            </div>
                        </div>
                        <div
                            onClick={() => setOpen(true)}
                            className="lg:hidden flex pl-5 cursor-pointer"
                        >
                            <span>
                                <i className="fa-regular fa-list"></i>
                            </span>
                        </div>
                    </div>
                </header>
            </div>
            <nav
                ref={navRef}
                className="bg-bgcolor-secondary card p-0 sticky top-0 z-[99] lg:block hidden shadow-xl shadow-black/30"
            >
                <div className="container flex justify-evenly items-center">
                    {navLinks.map((link, index) => {
                        return !link.children ? (
                            <NavLink
                                key={index}
                                className={({ isActive }) =>
                                    `transition relative group px-2 hover:text-secondary ${
                                        isActive ? "text-secondary" : ""
                                    }`
                                }
                                to={`/${language}${link.path}`}
                            >
                                {({ isActive }) => {
                                    return (
                                        <>
                                            <span
                                                className={`flex items-center gap-x-1 py-7 text-sm font-bold uppercase relative ${
                                                    link.id === 4
                                                        ? "after:hidden"
                                                        : "after:flex"
                                                } after:content-[''] after:absolute after:rounded-full after:w-full after:h-[2px] after:top-3/4 after:left-0 after:bg-border after:scale-x-0 after:origin-right after:transition-transform after:duration-400 group-hover:after:scale-x-100 ${
                                                    isActive
                                                        ? "after:scale-x-100"
                                                        : ""
                                                } group-hover:after:origin-left`}
                                            >
                                                {t(link.title)}
                                                <span
                                                    className={`${
                                                        link.id === 4
                                                            ? "flex"
                                                            : "hidden"
                                                    } group-hover:rotate-180 duration-300`}
                                                >
                                                    <ChevronDown size={18} />
                                                </span>
                                            </span>
                                            {link.id === 4 && (
                                                <div
                                                    className={`flex flex-col item-center absolute w-max -translate-x-1/2 top-full left-1/2 bg-primary text-white group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-3/4 pointer-events-none rounded-md shadow-lg transition-all duration-300`}
                                                >
                                                    <Link
                                                        to={`/${language}/news`}
                                                        className="text-white pb-2 hover:opacity-90 active:scale-95 duration-300 text-sm font-bold text-center p-3 pb-0"
                                                    >
                                                        {t("news")}
                                                    </Link>
                                                    <Link
                                                        to={`/${language}/announcements`}
                                                        className="text-white hover:opacity-90 active:scale-95 duration-300 text-sm font-bold text-center pt-2  p-3 border-t-2 border-white"
                                                    >
                                                        {t("announcement")}
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    );
                                }}
                            </NavLink>
                        ) : (
                            <div
                                key={index}
                                className={`transition relative group px-2 group hover:text-primary`}
                            >
                                <>
                                    <button
                                        type="button"
                                        className={`flex items-center gap-x-1 py-7 text-sm font-bold uppercase relative after:content-[''] `}
                                    >
                                        {t(link.title)}
                                        <span
                                            className={` group-hover:rotate-180 duration-300`}
                                        >
                                            <ChevronDown
                                                size={18}
                                                className="group-hover:stroke-primary"
                                            />
                                        </span>
                                    </button>
                                    <div
                                        className={`flex flex-col divide-white divide-y-2 item-center absolute w-max -translate-x-1/2 top-full left-1/2 bg-primary text-white group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-3/4 pointer-events-none rounded-md shadow-lg transition-all duration-300`}
                                    >
                                        {link.children &&
                                            link.children.map((item) => {
                                                return (
                                                    <Link
                                                        to={`/${language}${item.path}`}
                                                        className="text-white hover:opacity-90 active:scale-95 duration-300 text-sm font-bold text-center p-3 py-2"
                                                    >
                                                        {t(item.title)}
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                </>
                            </div>
                        );
                    })}
                    <div className="flex ">
                        <Link
                            to={`/${language}/tickets`}
                            className="button pr-3 flex items-center gap-x-2 font-semibold rounded-r-none lg:text-sm text-sm"
                        >
                            {t("tickets")}
                            <img src="/icons/tickets.svg" alt="ticket icon" />
                        </Link>
                        <span className="self-stretch w-[1.5px]"></span>
                        <Link
                            to={`/${language}/${token ? "cabinet" : "login"}`}
                            className="button p-0 rounded-l-none"
                        >
                            {token ? (
                                <div className="flex items-center justify-center h-full p-1">
                                    <img
                                        src={user.image}
                                        alt=""
                                        className="size-9 object-contain rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="p-2 pr-3 min-w-[50px] h-full flex items-center justify-center">
                                    <User className="stroke-white size-6" />
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
