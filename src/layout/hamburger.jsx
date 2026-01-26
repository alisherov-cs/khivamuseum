import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    FACEBOOK_ICON,
    INSTAGRAM_ICON,
    MAIN_LOGO,
    TELEGRAM_ICON,
    YOUTUBE_ICON,
} from "../constant/image";
import { navLinks, SITE_DATA } from "../constant";
import { useTranslation } from "react-i18next";
import Button from "../components/ui/button";
import LangChanger from "../components/parts/lang_changer";
import Glass from "../components/icons/glass";
import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { useSelector } from "react-redux";
import { getUser } from "../store/user";
const sidebarVariants = {
    open: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
    initial: {
        x: "-100%",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.2,
        },
    },
};

const menuItemVariants = {
    initial: {
        opacity: 0,
        x: -40,
    },
    open: {
        opacity: 1,
        x: 0,
    },
    closed: {
        opacity: 0,
        x: 40,
        transition: {
            delay: 0,
        },
    },
};

// Backdrop for mobile view
const backdropVariants = {
    open: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    initial: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};

export default function HamburgerBar({ open, setOpen }) {
    const [newsLink, setNewsLink] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    };
    const router = useNavigate();

    const { user, token } = useSelector(getUser);

    const {
        t,
        i18n: { language },
    } = useTranslation();

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed w-full h-[100vh] inset-0 bg-black/20 bg-opacity-50 z-[1000] xl:hidden"
                        initial="initial"
                        animate="open"
                        exit="initial"
                        variants={backdropVariants}
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed top-0 left-0 h-[100vh] w-full max-w-xs bg-bgcolor-secondary shadow-xl flex flex-col z-[1001] overflow-hidden"
                        initial="initial"
                        animate={"open"}
                        exit="initial"
                        variants={sidebarVariants}
                    >
                        <div className="p-6 py-5 flex justify-between items-center border-b-2 border-primary">
                            <div className="h-20">
                                <img
                                    className="h-full object-contain"
                                    src="/images/logo.png"
                                    alt=""
                                />
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-2xl"
                            >
                                <i className="fa-regular fa-xmark"></i>
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            <div className="py-4  duration-200  px-6 border-b-2 border-gray-200">
                                <LangChanger />
                            </div>
                            <nav className="flex flex-col">
                                {navLinks.map((link) =>
                                    link.children ? (
                                        <div
                                            className="flex flex-col"
                                            key={link.id}
                                        >
                                            <button
                                                key={link.path}
                                                onClick={() =>
                                                    setNewsLink(!newsLink)
                                                }
                                                className="text-base flex items-center gap-x-1 font-semibold py-4 border-b-2 border-gray-200  px-6  hover:bg-secondary/10 transition  outline-none focus:outline-none"

                                                // to={`/${language}${link.path}`}
                                                // onClick={() => setOpen(false)}
                                            >
                                                {t(link.title)}
                                                <span
                                                    className={`${link.id === 4 ? "flex" : "hidden"} ${
                                                        newsLink
                                                            ? "rotate-180"
                                                            : "rotate-0"
                                                    } duration-300`}
                                                >
                                                    <ChevronDown size={18} />
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {newsLink && (
                                                    <motion.div
                                                        className="overflow-hidden"
                                                        initial={{ height: 0 }}
                                                        animate={{
                                                            height: "auto",
                                                        }}
                                                        exit={{ height: 0 }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                    >
                                                        <div className="">
                                                            {link.children.map(
                                                                (children) => (
                                                                    <NavLink
                                                                        key={
                                                                            children.path
                                                                        }
                                                                        className={({
                                                                            isActive,
                                                                        }) =>
                                                                            `text-base flex items-center gap-x-1 font-semibold py-4 border-b-2 border-gray-200  px-6  hover:bg-secondary/10 transition  `
                                                                        }
                                                                        to={`/${language}${children.path}`}
                                                                        onClick={() =>
                                                                            setOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        {t(
                                                                            children.title
                                                                        )}
                                                                    </NavLink>
                                                                )
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <NavLink
                                            key={link.path}
                                            className={({ isActive }) =>
                                                `text-base flex items-center gap-x-1 font-semibold py-4 border-b-2 border-gray-200  px-6  hover:bg-secondary/10 transition  `
                                            }
                                            to={`/${language}${link.path}`}
                                            onClick={() => setOpen(false)}
                                        >
                                            {t(link.title)}
                                        </NavLink>
                                    )
                                )}
                            </nav>

                            <div className="py-4  duration-200  px-6 border-b-2 border-gray-200">
                                <Link
                                    className="flex items-center gap-x-2 text-black"
                                    to="https://khivamuseumshop.uz/main/home"
                                >
                                    <span>
                                        <i className="fa-brands fa-shopify"></i>
                                    </span>
                                    <span className="">Khiva Museum Shop</span>
                                </Link>
                            </div>
                            <div className="py-4  duration-200  px-5">
                                <Link
                                    className="flex items-center gap-x-2 text-black"
                                    to="https://khiva360.nazzar.uz/"
                                >
                                    <Glass className="fill-text" />
                                    <span className="">Khiva 360°</span>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center px-4 py-3">
                            <div className="flex w-full">
                                <Link
                                    to={`/${language}/tickets`}
                                    className="button pr-3 flex flex-1 items-center gap-x-2 font-semibold rounded-r-none lg:text-sm text-sm"
                                >
                                    {t("tickets")}
                                    <img
                                        src="/icons/tickets.svg"
                                        alt="ticket icon"
                                    />
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

                        <div className="mt-auto flex flex-col  p-6 items-center border-t-2 border-gray-200">
                            <div className="flex  w-full items-center justify-between">
                                <a
                                    href={`${SITE_DATA.socials.telegram}`}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                                >
                                    {/* <FontAwesomeIcon icon={faTelegram} className='size-4' /> */}
                                    <i className="fa-brands fa-telegram text-white"></i>
                                </a>
                                <a
                                    href={`${SITE_DATA.socials.instagram}`}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                                >
                                    {/* <FontAwesomeIcon icon={faInstagram} className='size-4' /> */}
                                    <i className="fa-brands fa-instagram text-white"></i>
                                </a>
                                <a
                                    href={`mailto:${SITE_DATA.email}`}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                                >
                                    {/* <MailIcon className='size-4' /> */}
                                    <i className="fa-regular fa-envelope text-white"></i>
                                </a>
                                <a
                                    href={`tel:${SITE_DATA.phone}`}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                                >
                                    {/* <PhoneIcon className='size-4' /> */}
                                    <i className="fa-regular fa-phone text-white"></i>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
