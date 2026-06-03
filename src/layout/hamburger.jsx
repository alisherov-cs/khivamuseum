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
              <button onClick={() => setOpen(false)} className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="overflow-y-auto">
              <div className="py-4  duration-200  px-6 border-b-2 border-gray-200">
                <LangChanger />
              </div>
              <nav className="flex flex-col">
                {navLinks.map((link) =>
                  link.children ? (
                    <div className="flex flex-col" key={link.id}>
                      <button
                        key={link.path}
                        onClick={() => setNewsLink(!newsLink)}
                        className="text-base flex items-center gap-x-1 font-semibold py-4 border-b-2 border-gray-200  px-6  hover:bg-secondary/10 transition  outline-none focus:outline-none"

                        // to={`/${language}${link.path}`}
                        // onClick={() => setOpen(false)}
                      >
                        {t(link.title)}
                        <span
                          className={`${link.id === 4 ? "flex" : "hidden"} ${
                            newsLink ? "rotate-180" : "rotate-0"
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
                              {link.children.map((children) => (
                                <NavLink
                                  key={children.path}
                                  className={({ isActive }) =>
                                    `text-base flex items-center gap-x-1 font-semibold py-4 border-b-2 border-gray-200  px-6  hover:bg-secondary/10 transition  `
                                  }
                                  to={`/${language}${children.path}`}
                                  onClick={() => setOpen(false)}
                                >
                                  {t(children.title)}
                                </NavLink>
                              ))}
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
                  ),
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

            <div className="mt-auto flex flex-col  p-6 items-center border-t-2 border-gray-200">
              <div className="flex  w-full items-center justify-between">
                <a
                  href={`${SITE_DATA.socials.telegram}`}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                >
                  {/* <FontAwesomeIcon icon={faTelegram} className='size-4' /> */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_318_61)">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="url(#paint0_linear_318_61)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8638 23.7466C17.8603 20.6984 22.5257 18.6888 24.8601 17.7179C31.5251 14.9456 32.91 14.4641 33.8127 14.4482C34.0113 14.4447 34.4552 14.4939 34.7427 14.7272C34.9855 14.9242 35.0523 15.1904 35.0843 15.3771C35.1163 15.5639 35.1561 15.9895 35.1244 16.3219C34.7633 20.1169 33.2004 29.3263 32.4054 33.5767C32.0689 35.3752 31.4065 35.9782 30.7652 36.0373C29.3715 36.1655 28.3131 35.1162 26.9632 34.2313C24.8509 32.8467 23.6576 31.9847 21.6072 30.6336C19.2377 29.0721 20.7738 28.2139 22.1242 26.8113C22.4776 26.4442 28.6183 20.8587 28.7372 20.352C28.7521 20.2886 28.7659 20.0524 28.6255 19.9277C28.4852 19.803 28.2781 19.8456 28.1286 19.8795C27.9168 19.9276 24.5423 22.158 18.0053 26.5707C17.0475 27.2284 16.1799 27.5489 15.4026 27.5321C14.5457 27.5135 12.8973 27.0475 11.6719 26.6492C10.1689 26.1606 8.97432 25.9023 9.07834 25.0726C9.13252 24.6404 9.72767 24.1984 10.8638 23.7466Z" fill="white"/>
</g>
<defs>
<linearGradient id="paint0_linear_318_61" x1="24" y1="0" x2="24" y2="47.644" gradientUnits="userSpaceOnUse">
<stop stop-color="#2AABEE"/>
<stop offset="1" stop-color="#229ED9"/>
</linearGradient>
<clipPath id="clip0_318_61">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>

                </a>
                <a
                  href={`${SITE_DATA.socials.instagram}`}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                >
                  {/* <FontAwesomeIcon icon={faInstagram} className='size-4' /> */}
                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_17_27)">
<path d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z" fill="#000100"/>
<path d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z" fill="#000100"/>
<path d="M39.6937 11.1844C39.6937 12.7782 38.4 14.0625 36.8156 14.0625C35.2219 14.0625 33.9375 12.7688 33.9375 11.1844C33.9375 9.59065 35.2313 8.30627 36.8156 8.30627C38.4 8.30627 39.6937 9.60003 39.6937 11.1844Z" fill="#000100"/>
</g>
<defs>
<clipPath id="clip0_17_27">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>

                </a>
                
                <a
                  href={`tel:${SITE_DATA.phone}`}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary"
                >
                  {/* <PhoneIcon className='size-4' /> */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 0C37.2547 0 48 10.7453 48 24C48 37.2547 37.2547 48 24 48C19.82 48 15.8904 46.9314 12.4678 45.0527L0 48L3.19629 35.9736C1.16368 32.4497 0 28.3606 0 24C6.76533e-07 10.7453 10.7453 6.76489e-07 24 0ZM24 4.29785C13.1194 4.29785 4.299 13.1185 4.29883 23.999C4.29883 28.1943 5.6104 32.083 7.8457 35.2783L5.7793 42.3193L13.1455 40.4434C16.2581 42.5026 19.9887 43.7012 24 43.7012V43.7002C34.8807 43.7002 43.7012 34.8797 43.7012 23.999C43.701 13.1185 34.8806 4.29785 24 4.29785ZM17.4043 12.1562C17.6982 12.1324 17.9685 12.3028 18.0938 12.5693L20.8311 18.376C20.9604 18.6506 20.9041 18.9777 20.6895 19.1924L18.6484 21.2324C18.2072 21.6737 18.0781 22.361 18.3818 22.9062C19.1265 24.2415 20.1281 25.5276 21.2881 26.7109C22.4714 27.8709 23.7574 28.8732 25.0928 29.6172C25.6381 29.9212 26.3246 29.7919 26.7666 29.3506L28.8076 27.3096C29.0222 27.0953 29.3486 27.0382 29.623 27.168L35.4297 29.9053C35.6964 30.0306 35.8677 30.3014 35.8438 30.5947C35.7811 31.3587 35.4741 32.8901 34.1016 34.2627C30.227 38.1372 23.2692 33.7536 22.9854 33.584C21.2741 32.6647 19.6483 31.4347 18.1064 29.8936C16.5651 28.3522 15.3344 26.725 14.415 25.0137C14.2445 24.7301 9.86133 17.7735 13.7363 13.8984C15.109 12.5258 16.6403 12.2189 17.4043 12.1562Z" fill="white"/>
</svg>

                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
