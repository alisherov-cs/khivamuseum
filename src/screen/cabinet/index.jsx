import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  LogOut,
  Package,
  Settings2Icon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CabinetLoader from "../../components/loader/cabinet";
import IsLoading from "../../components/loader/helper";
import { loaders_keys } from "../../constant";
import { getUser, logoutUser } from "../../store/user";
import CabinetOrder from "./order";
import CabinetPayments from "./payment";
import CabinetSettings from "./settings";
import CabinetCanceledOrders from "./canceled";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const screenVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.25 },
  },
};

const menuItems = [
  { path: "orders", icon: Package, title: "ticket_list" },
  { path: "canceled", icon: XCircleIcon, title: "cancelled" },
  { path: "payment", icon: ArrowUpRight, title: "transfer_history" },
  { path: "settings", icon: Settings2Icon, title: "settings" },
];

const Cabinet = () => {
  const { user } = useSelector(getUser);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const router = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    router(`/${language}/login`);
  };

  const cabinet_loader = IsLoading(loaders_keys.cabinet);

  const location = useLocation();

  return (
    <motion.div
      className="bg-bgcolor flex-1 py-4 md:py-8 lg:pb-[90px] sm:pb-[60px] pb-[40px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="card p-0 overflow-hidden bg-bgcolor-secondary rounded-2xl shadow-lg sticky top-[var(--navHeight)]">
              <div className="p-4 bg-gradient-to-br from-primary to-primary/80 text-white">
                <motion.div
                  className="flex items-center space-x-4 *:text-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-[50px] aspect-square rounded-full overflow-hidden bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    {user.image ? (
                      <img
                        src={user.image}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="size-8 stroke-white" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-inherit font-bold text-lg leading-[1.3]">
                      {user.last_name} {user.first_name}
                    </h3>
                    <p className="text-white/80 text-sm break-all line-clamp-1">
                      {user.email}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <NavLink
                    key={item.path}
                    to={`/${language}/cabinet/${item.path}`}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between p-4 rounded-xl transition-all duration-75 ${
                        isActive
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-text hover:bg-primary/10 hover:text-primary"
                      }`
                    }
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">
                        {t(item.title)}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </NavLink>
                ))}
              </div>

              <div className="p-2 border-t border-text/10">
                <motion.button
                  onClick={logout}
                  className="w-full cursor-pointer flex items-center space-x-3 p-4 group hover:bg-red-500/5 rounded-xl transition-colors duration-300"
                >
                  <LogOut className="size-5 group-hover:stroke-red-500 group-hover:translate-x-2 transition-transform" />
                  <span className="font-medium text-sm group-hover:text-red-500 group-hover:translate-x-2 transition-transform">
                    {t("logout")}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <div className="card bg-bgcolor-secondary sm:p-8 p-5 py-6 rounded-xl overflow-hidden min-h-[600px] relative">
              <AnimatePresence mode="wait">
                <CabinetLoader open={cabinet_loader} />
                <motion.div
                  key={location.pathname}
                  variants={screenVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                  }}
                >
                  <Routes location={location}>
                    <Route
                      index
                      element={
                        <Navigate to={`/${language}/cabinet/orders`} replace />
                      }
                    />
                    <Route
                      path="/canceled"
                      element={<CabinetCanceledOrders />}
                    />
                    <Route path="/orders" element={<CabinetOrder />} />
                    <Route path="/payment" element={<CabinetPayments />} />
                    <Route path="/settings" element={<CabinetSettings />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cabinet;
