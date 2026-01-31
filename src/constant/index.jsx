import {
  AlertTriangleIcon,
  CheckIcon,
  EyeIcon,
  ShoppingCartIcon,
  SproutIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import tailwindConfig from "../../tailwind.config";
import { payment_logo } from "./image";
import PaymentClickForm from "../components/parts/form/payment_click";
import PaymentLocalForm from "../components/parts/form/payment_local";
import PaymentInternationalForm from "../components/parts/form/payment_international";

export const COLORS = tailwindConfig.theme.extend.colors;

export const SITE_DATA = {
  title: "Khiva Museum",
  web_title: "khivamuseum.uz",
  web_url: "https://khivamuseum.uz",
  map_title: "Xorazm, Xiva shahri",
  map_url:
    "https://yandex.uz/maps/10339/khiva/?from=mapframe&ll=60.358337%2C41.378925&mode=poi&poi%5Bpoint%5D=60.358073%2C41.378998&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D186196413794&source=mapframe&utm_source=mapframe&z=19.73",
  map_view:
    "https://yandex.uz/maps/10339/khiva/?from=mapframe&ll=60.358337%2C41.378925&mode=poi&poi%5Bpoint%5D=60.358073%2C41.378998&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D186196413794&source=mapframe&utm_source=mapframe&z=19.73",
  khiva_360: "https://khiva360.nazzar.uz",
  phone: "+998556046343",
  email: "info@khivamuseum.uz",
  work_hours: {
    start: "09:00",
    end: "18:00",
  },
  work_week: {
    start: "Dushanba",
    end: "Yakshanba",
  },
  socials: {
    telegram: "https://khivamuseum.uz/uz/home",
    instagram: "https://www.instagram.com/khivamuseumuzb/",
    youtube: "https://www.youtube.com/@khivamuseum.2025",
    // facebook: 'https://instagram.com/qovunsayli'
  },
  stats: [
    { id: 1, value: "120", title: "participants", icon: UsersIcon },
    { id: 2, value: "24", title: "melon_varieties", icon: SproutIcon },
    { id: 3, value: "1600", title: "visitors", icon: EyeIcon },
    { id: 4, value: "300", title: "sold_products", icon: ShoppingCartIcon },
  ],
};

export const navLinks = [
  {
    id: 0,
    path: "/home",
    title: "home",
  },
  {
    id: 1,
    title: "about",
    children: [
      { title: "about_museum", path: "/about" },
      { title: "employees", path: "/employees" },
    ],
  },
  {
    id: 2,
    path: "/collections",
    title: "museum_collection",
  },
  {
    id: 3,
    path: "/gallery",
    title: "gallery",
  },
  {
    id: 4,
    title: "news",
    children: [
      { title: "news", path: "/news" },
      { title: "announcement", path: "/announcements" },
    ],
  },
  {
    id: 5,

    path: "/contact",
    title: "contact",
  },
];

export const loaders_keys = {
  main: "main_loader",
  cabinet: "cabinet_screen_loader",
  dash_news_overlay: "dash_news_overlay_loader",
  dash_gallery_overlay: "dash_news_overlay_loader",
  dash_contact_overlay: "dash_contact_overlay_loader",
};

export const default_loader = Object.values(loaders_keys)[0];

export const week_days = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
];
export const ticket_sold_statuses = {
  paid: {
    color: "green",
    title: "To'langan",
    icon: CheckIcon,
  },
  unpaid: {
    color: "orange",
    title: "To'lanmagan",
    icon: AlertTriangleIcon,
  },
  canceled: {
    color: "red",
    title: "Bekor qilingan",
    icon: XIcon,
  },
};

export const ticket_sold_statuses_arr = Object.keys(ticket_sold_statuses).map(
  (key) => ({
    ...ticket_sold_statuses[key],
    key,
  }),
);
export const payment_categories = [
  {
    id: "local",
    name: "UzCard/Humo",
    icon: "🇺🇿",
    color: "bg-green-500",
    payments: [
      {
        title: "Uzcard",
        logo: payment_logo.UZCARD,
        form: PaymentClickForm,
      },
      {
        title: "Humo",
        logo: payment_logo.HUMO,
        form: PaymentClickForm,
      },
    ],
  },
  {
    id: "mobile",
    name: "Click/Payme",
    icon: "📱",
    color: "bg-yellow-500",
    payments: [
      {
        title: "Click",
        logo: payment_logo.CLICK,
        form: PaymentLocalForm,
      },
      {
        title: "Payme",
        logo: payment_logo.PAYME,
        form: PaymentLocalForm,
      },
    ],
  },
  {
    id: "international",
    name: "Visa/Mastercard",
    icon: "🌎",
    color: "bg-blue-500",
    payments: [
      {
        title: "Visa",
        logo: payment_logo.VISA,
        form: PaymentInternationalForm,
      },
      {
        title: "Mastercard",
        logo: payment_logo.MASTERCARD,
        form: PaymentInternationalForm,
      },
    ],
  },
];

export const slides = [
  {
    image: "/images/xiva-1.jpg",
    title: "ichan_qala_title",
    location: "khiva_location",
  },
  {
    image: "/images/xiva-2.jpg",
    title: "arda_khiva_slogan",
    location: "khiva_location",
  },
  {
    image: "/images/xiva-3.jpg",
    title: "kalta_minor_slogan",
    location: "khiva_location",
  },
];

export const expositions = [
  {
    image: "/images/xiva-5.jpg",
    title: "ichan_qala_title",
    desc: "ichan_qala_desc",
  },
  {
    image: "/images/xiva-7.webp",
    title: "kunya_ark_title",
    desc: "kunya_ark_desc",
  },
  {
    image: "/images/xiva-8.jpg",
    title: "tosh_hovli_title",
    desc: "tosh_hovli_desc",
  },
  {
    image: "/images/xiva-9.jpg",
    title: "juma_mosque_title",
    desc: "juma_mosque_desc",
  },
  {
    image: "/images/xiva-10.jpg",
    title: "islam_khoja_title",
    desc: "islam_khoja_desc",
  },
  {
    image: "/images/xiva-6.jpg",
    title: "kalta_minor_title",
    desc: "kalta_minor_desc",
  },
  {
    image: "/images/xiva-12.webp",
    title: "pakhlavan_mahmud_title",
    desc: "pakhlavan_mahmud_desc",
  },
  {
    image: "/images/xiva-13.jpg",
    title: "nurullaboy_title",
    desc: "nurullaboy_desc",
  },
  {
    image: "/images/xiva-11.jpg",
    title: "muhammad_amin_title",
    desc: "muhammad_amin_desc",
  },
];

export const stats = [
  {
    icon: "/images/stat-1.png",
    title: "artifacts_1000_years_old",
    number: 3200,
  },
  {
    icon: "/images/stat-2.png",
    title: "exclusive_khiva_artifacts",
    number: 500,
  },
  {
    icon: "/images/stat-3.png",
    title: "silk_road_artifacts",
    number: 12000,
  },
  {
    icon: "/images/stat-4.png",
    title: "research_projects",
    number: 85,
  },
];

export const monuments = [
  {
    image: "/images/art-2.jpg",
    title: "ceramics_title",
    desc: "ceramics_desc",
  },
  {
    image: "/images/art-3.webp",
    title: "textiles_title",
    desc: "textiles_desc",
  },
  {
    image: "/images/art-1.webp",
    title: "weapons_title",
    desc: "weapons_desc",
  },
];

export const gallery = [
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
  "/images/gallery-10.jpg",
  "/images/gallery-11.jpg",
  "/images/gallery-12.jpg",
  "/images/gallery-13.jpg",
  "/images/gallery-14.jpg",
  "/images/gallery-15.jpg",
  "/images/gallery-16.jpg",
  "/images/gallery-17.jpg",
  "/images/gallery-18.jpg",
  "/images/gallery-20.jpg",
];

export const ORDER_STATUSES = {
  created: {
    key: "created",
    title: "Kutilmoqda",
    color: "#facc15", // sariq – Tailwind yellow-400: kutilyapti
  },
  paid: {
    key: "paid",
    title: "To'langan",
    color: "#16a34a", // Tailwind green-600 – barqaror yashil: tasdiqlangan to‘lov
  },
  visited: {
    key: "visited",
    title: "Kirilgan",
    color: "#3b82f6", // Tailwind blue-500 – faoliyat/tashrif belgisi uchun mos
  },
  expired: {
    key: "expired",
    title: "Muddati o'tgan",
    color: "#9ca3af", // Tailwind gray-400 – xira rang: muddati o‘tgan narsa belgisi
  },
  canceled: {
    key: "canceled",
    title: "Bekor qilingan",
    color: "#dc2626", // Tailwind red-600 – aniq qizil: bekor qilingan belgisi
  },
};

export const PAYMENT_STATUSES = {
  pending: {
    title: "Tayyorlanmoqda",
    color: "#facc15", // sariq (Tailwind yellow-400)
  },
  paid: {
    title: "To'langan",
    color: "#22c55e", // yashil (Tailwind green-500)
  },
  pending_canceled: {
    title: "Bekor qilingan",
    color: "#ef4444", // qizil (Tailwind red-500)
  },
  paid_canceled: {
    title: "Bekor qilingan",
    color: "#ef4444", // qizil (Tailwind red-500)
  },
};

export const employees = [
  {
    id: 1,
    fullName: "Ibragimov Adilbek G'aipnazarovich",
    birthday: "01.07.1964",
    nation: "O'zbek",
    role: "\"Ichan - Qal'a\" davlat muzey qo'riqxonasi bo'lim direktori",
    image: "/employees/adilbek.png",
  },
  {
    id: 2,
    fullName: "Madaliev Hamza Shavkatovich",
    birthday: "20.01.1982",
    nation: "O'zbek",
    role: "\"Ichan - Qal'a\" davlat muzey qo'riqxonasi fond bosh saqlovchisi",
    image: "/employees/hamza.png",
  },
  {
    id: 3,
    fullName: "Matrasulov Lochinbek Shixnazarovich",
    birthday: "13.09.1974",
    nation: "O'zbek",
    role: "\"Ichan - Qal'a\" davlat muzey qo'riqxonasi direktor o'rinbosari",
    image: "/employees/lochin.png",
  },
  {
    id: 4,
    fullName: "Erniyazov Rustambek Davronbekovich",
    birthday: "29.10.1985",
    nation: "O'zbek",
    role: "\"Ichan - Qal'a\" davlat muzey qo'riqxonasi direktor o'rinbosari",
    image: "/employees/rustam.png",
  },
];
