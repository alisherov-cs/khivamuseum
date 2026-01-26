import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
import CheckLang from "../components/ui/check_lang";
import { useEffect, useState } from "react";
import { change_text_size } from "../components/parts/change_text_size";
import HamburgerBar from "./hamburger";
import { useDispatch, useSelector } from "react-redux";
import API from "../api";
import { getUser, updateLoader, updateUser, updateToken } from "../store/user";
import useDimension from "../hooks/useDimension";

export default function MainLayout({ routbar }) {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const { token } = useSelector(getUser);

    const { width } = useDimension();

    useEffect(() => {
        if (localStorage.getItem("gray")) {
            document.body.style.filter = "grayscale(1)";
            localStorage.setItem("gray", true);
        }
        const zoom = localStorage.getItem("text-size");
        if (zoom) {
            change_text_size(zoom);
        }

        const fetchUser = async () => {
            dispatch(updateLoader({ value: { loading: true } }));
            try {
                const { data } = await API.get("users/user");
                dispatch(updateUser(data));
            } catch (err) {
                if (err.response?.status === 401) {
                    dispatch(updateToken(""));
                }
            } finally {
                dispatch(updateLoader({ value: { loading: false } }));
            }
        };
        if (token) fetchUser();
    }, []);

    return (
        <>
            {width < 1020 && <HamburgerBar open={open} setOpen={setOpen} />}
            <Navbar open={open} setOpen={setOpen} />
            <CheckLang>
                <div className="min-h-section flex flex-col">
                    {routbar && <div className="min-h-nav"></div>}
                    <Outlet />
                </div>
            </CheckLang>
            <Footer />
        </>
    );
}
