import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clearCart, getUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import { ShoppingCartIcon, X } from "lucide-react";
import Button from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion as m } from "framer-motion";
import TicketSingle from "./ticketSingle";

export default function Cart() {
    const [hoverCart, setHoverCart] = useState(false);
    const { token, cart } = useSelector(getUser);
    const router = useNavigate();
    const dispatch = useDispatch();
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const total_price = useMemo(() => {
        return cart.reduce(
            (acc, item) => acc + item.item.price * item.quantity,
            0
        );
    }, [cart]);

    const handleOrder = useCallback(async () => {
        try {
            if (!token) {
                router(`/${language}/login`);
                toast.error(t("login_required_message"));
                return;
            }
            if (cart.length === 0) {
                return;
            }

            const orderData = cart.map((item) => ({
                ticket_id: item.item.id,
                quantity: item.quantity,
            }));

            await API.post("orders", { orders: orderData })
                .then(({ data }) => {
                    if (data) {
                        dispatch(clearCart());
                        toast.success(t("order_successful"));
                        router(`/${language}/cabinet/orders`);
                    } else {
                        toast.error(t("order_failed"));
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }, [cart, dispatch, t, language, API]);

    const cartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setHoverCart(false);
            }
        };

        if (hoverCart) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hoverCart]);

    return (
        <AnimatePresence>
            {cart.length > 0 && (
                <m.div
                    initial={{ x: "100%" }}
                    animate={hoverCart ? { x: 0 } : {}}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="fixed top-1/2 -translate-y-1/2 z-[99] right-0 menu-style"
                >
                    <div ref={cartRef} className="relative max-w-lg mx-auto">
                        <m.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                scale: [1, 1, 1.5, 1],
                                transformOrigin: "right",
                                transition: {
                                    scale: {
                                        duration: 0.5,
                                    },
                                },
                            }}
                            exit={{
                                x: "100%",
                                opacity: 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                            onClick={() => setHoverCart((prev) => !prev)}
                            className={`absolute w-[55px] aspect-square cursor-pointer flex items-center justify-center text-white text-xl bg-primary z-[1000] top-1/2 -translate-y-1/2 -translate-x-full rounded-l-xl before:rounded-full before:w-[10px] before:duration-500 before:h-[10px] before:bg-red-500 before:absolute before:-top-[5%] before:-left-[10%] before:z-20 after:z-10 special-anim-wave after:rounded-full after:w-[10px] after:duration-500 after:h-[10px] after:bg-primary after:absolute after:-top-[5%] after:-left-[11%] ${
                                hoverCart
                                    ? "before:pointer-events-none before:opacity-0 after:hidden"
                                    : "before:pointer-events-auto before:opacity-100 after:flex after:opacity-100"
                            }`}
                        >
                            <ShoppingCartIcon className="size-7 stroke-white" />
                        </m.div>

                        <div
                            className={`relative min-w-[20vw] flex flex-col bg-bgcolor-secondary h-screen backdrop-blur-md rounded-2xl rounded-r-none p-5 ${
                                hoverCart ? "shadow-xl shadow-black/15" : ""
                            } border border-glow_color`}
                        >
                            <span
                                onClick={() => setHoverCart((prev) => !prev)}
                                className="cursor-pointer pb-3 mb-3"
                            >
                                <X size={24} />
                            </span>
                            <div className="mb-4 text-lg text-gray-600 overflow-auto flex-1">
                                {cart.map((cart_item, i) => (
                                    <TicketSingle data={cart_item} id={i} />
                                ))}
                            </div>
                            <div className="mt-auto mb-5 flex justify-between gap-x-3 items-end">
                                <span className="text-xl font-semibold *:first-letter:capitalize">
                                    {t("total")}:
                                </span>
                                <span className="flex items-end gap-x-1">
                                    <span
                                        className={`text-2xl font-bold duration-300 text-primary`}
                                    >
                                        {total_price}
                                    </span>
                                    <div className="text-sm text-text/60 font-medium mb-1">
                                        sum
                                    </div>
                                </span>
                            </div>
                            <Button
                                click={handleOrder}
                                className="*:first-letter:capitalize"
                            >
                                {t("order")}
                            </Button>
                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
