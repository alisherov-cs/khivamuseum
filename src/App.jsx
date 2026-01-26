import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IsLoading from "./components/loader/helper";
import LoaderMain from "./components/loader/main";
import ScrollToTop from "./components/parts/scroll_to_top";
import StopLoader from "./components/parts/stop_loader";
import MainLayout from "./layout/main_layout";
import About from "./screen/about";
import ForgotPasswordSendLink from "./screen/auth/forgot_password/send_link";
import ForgotPasswordVerify from "./screen/auth/forgot_password/verify";
import LayoutLogin from "./screen/auth/layout";
import UserLogin from "./screen/auth/login";
import UserRegister from "./screen/auth/register";
import VerificationEmail from "./screen/auth/verify-email";
import Cabinet from "./screen/cabinet";
import ProfileInfo from "./screen/cabinet/cabinet-components";
import ProfilePage from "./screen/cabinet/lkkdmaskd";
import Collection from "./screen/collection";
import CollectionSingle from "./screen/collection/collectionsingle";
import Contact from "./screen/contact";
import Gallery from "./screen/gallery";
import Home from "./screen/home";
import News from "./screen/news";
import NewsDetails from "./screen/news/details";
import NotFoundPage from "./screen/not";
import {
  default as KhivaMuseumTickets,
  default as Tickets,
} from "./screen/ticket";
import { getUser } from "./store/user";
import Announcements from "./screen/announcement";
import AnnouncementSingle from "./screen/announcement/announcements";
import Employees from "./screen/employees";

function App() {
  const main_loader = IsLoading();

  const {
    i18n: { language },
  } = useTranslation();
  const ert = useSelector(getUser);
  const { token, user } = ert;

  return (
    <>
      <LoaderMain open={main_loader} />
      <ToastContainer theme="dark" position="top-center" closeButton={true} />
      <ScrollToTop loading={main_loader} />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${language}/home`} replace />}
        />
        <Route path="/verify" element={<VerificationEmail />} />
        <Route path="/change-password" element={<LayoutLogin />}>
          <Route index element={<ForgotPasswordVerify />} />
        </Route>
        <Route path="/:lang" element={<MainLayout />}>
          {!user.id && !token && (
            <>
              <Route path="login" element={<LayoutLogin />}>
                <Route index element={<UserLogin />} />
                <Route
                  path="forgot-password"
                  element={<ForgotPasswordSendLink />}
                />
              </Route>
              <Route path="register" element={<LayoutLogin />}>
                <Route index element={<UserRegister />} />
              </Route>
            </>
          )}
          <Route
            path="cabinet/*"
            element={
              token ? (
                <Cabinet />
              ) : (
                <Navigate to={`/${language}/login`} replace />
              )
            }
          />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tic" element={<ProfilePage />} />
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="employees" element={<Employees />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="about" element={<About />} />
          <Route path="collections" element={<Collection />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="announcements/:id" element={<AnnouncementSingle />} />
          <Route path="collection/:id" element={<CollectionSingle />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tickets" element={<KhivaMuseumTickets />} />
          <Route path="qwe" element={<ProfileInfo />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <StopLoader />
    </>
  );
}

export default App;
