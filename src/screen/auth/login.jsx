import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import { updateUser, updateToken, updateLoader } from "../../store/user";
import API from "../../api";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import useTheme from "../../hooks/useTheme";

export default function UserLogin() {
    const router = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const [login, setLogin] = useState({});

    const setUser = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await API.post("users/login", {
                login_type: "email",
                ...login,
            })
                .then((data) => {
                    toast.success(t("successful_login"));
                    const {
                        data: { user, token },
                    } = data;

                    if (token) dispatch(updateToken(token));
                    if (user) dispatch(updateUser(user));
                    router(`/${language}/cabinet`);
                })
                .catch((err) => {
                    if (err.response?.data?.err) {
                        toast.error(err.response.data.err);
                    }
                });
        } finally {
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            dispatch(updateLoader({ value: { loading: true } }));
            await API.post("users/login", {
                login_type: "google",
                google_token: credentialResponse.credential,
            })
                .then((data) => {
                    const {
                        data: { user, token },
                    } = data;

                    if (token) dispatch(updateToken(token));
                    if (user) dispatch(updateUser(user));

                    toast.success(t("successful_login"));
                    router(`/${language}/cabinet`);
                })
                .catch((err) => {
                    if (err.response?.data?.err) {
                        toast.error(err.response.data.err);
                    }
                });
        } finally {
            dispatch(updateLoader({ value: { loading: false } }));
        }
    };

    return (
        <form className="flex flex-col space-y-4">
            <div className="space-y-2">
                <h1 className="text-center text-xl uppercase font-semibold">
                    {t("login")}
                </h1>
            </div>

            <form className="space-y-4 flex flex-col">
                <input
                    type="text"
                    onChange={setUser}
                    name="email"
                    className="input"
                    placeholder={t("email")}
                />
                <input
                    type="password"
                    onChange={setUser}
                    name="password"
                    className="input"
                    placeholder={t("password")}
                />
                <Link
                    to={`forgot-password`}
                    className="text-primary text-sm text-center font-medium"
                >
                    {t("forgot_password")}
                </Link>
            </form>

            <Button click={submit} className={"!text-white"}>
                {t("login")}
            </Button>

            <span className="text-xs text-center mt-">{t("or")}</span>
            <form className="flex justify-center *:!text-black">
                <GoogleOAuthProvider clientId="1092189306458-0kn10qhchtpmnd1a99rv8iuenpq59r7c.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => toast.error("Google auth failed")}
                        text="signin_with"
                        theme={"filled_black"}
                        ux_mode="popup"
                    />
                </GoogleOAuthProvider>
            </form>

            <p className="text-sm text-center font-normal">
                {t("havent_registered_yet")}
                <Link
                    to={`/${language}/register`}
                    className="text-primary font-medium ml-1"
                >
                    {t("sign_up")}
                </Link>
            </p>
        </form>
    );
}
