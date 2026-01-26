import { motion as m } from "framer-motion";
import { TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../../components/ui/inputs/counter";
import { priceFormat } from "../../helper/price_format";
import useFetch from "../../hooks/useFetch";
import { decrementCart, getUser, incrementCart } from "../../store/user";
import Cart from "./cart";

export default function Tickets() {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const [isVisible, setIsVisible] = useState(false);

    const {
        data: { items: tickets },
        loading,
    } = useFetch("tickets");

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const { cart } = useSelector(getUser);

    const dispatch = useDispatch();

    const increment = (item) => {
        dispatch(incrementCart(item));
    };

    const decrement = (id) => {
        dispatch(decrementCart(id));
    };

    return (
        !loading && (
            <div className="bg-gradient-to-br from-transparent to-primary/5 flex-1 overflow-hidden">
                <div className="container relative lg:py-[90px] sm:py-[60px] py-[40px]">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5">
                        {tickets?.map((ticket, index) => {
                            const cart_item =
                                cart.find((c) => c.item.id === ticket.id) || {};
                            return (
                                <m.div
                                    key={ticket.id}
                                    className={`group relative w-full md:p-2 transform transition-all duration-500 hover:scale-105 group ${
                                        isVisible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-20 opacity-0"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Magical Glow Effect */}
                                    <div
                                        className={`absolute inset-0 rounded-3xl blur-lg`}
                                    ></div>

                                    <div
                                        className={`relative bg-bgcolor-secondary backdrop-blur-md h-full rounded-3xl shadow-xl border-2 border-border! transition-all duration-300 overflow-hidden cursor-pointer ${"border-primary/30 hover:border-primary"}`}
                                    >
                                        <div className="p-8 h-full flex flex-col">
                                            <div className="flex items-center justify-between mb-6">
                                                <div
                                                    className={`relative p-4 rounded-2xl bg-primary shadow-lg transform transition-all duration-300 scale-110 group-hover:rotate-12`}
                                                >
                                                    <div className="text-white relative z-10">
                                                        <TicketIcon className="size-6 stroke-white" />
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div
                                                        className={`text-3xl font-bold transition-all duration-300 ${"text-text scale-110"}`}
                                                    >
                                                        {priceFormat(
                                                            ticket.price
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <h4 className="text-lg font-bold mb-4 text-primary">
                                                {ticket[language].title}
                                            </h4>

                                            <p className="mb-6 text-shadow-text text-sm leading-relaxed line-clamp-8">
                                                {ticket[language].description}
                                            </p>
                                            <div className="flex items-center justify-center gap-4 mt-auto">
                                                {!(cart_item.quantity > 0) ? (
                                                    <button
                                                        onClick={() =>
                                                            increment(ticket)
                                                        }
                                                        className="button bg-primary font-bold text-lg transition px-6 py-2 w-full"
                                                        type="button"
                                                    >
                                                        Sotib olish
                                                    </button>
                                                ) : (
                                                    <Counter
                                                        min={0}
                                                        max={100}
                                                        initialValue={
                                                            cart_item.quantity
                                                        }
                                                        onIncrement={() =>
                                                            increment(ticket)
                                                        }
                                                        onDecrement={() =>
                                                            decrement(ticket.id)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </m.div>
                            );
                        })}
                    </div>
                    <Cart />
                </div>
            </div>
        )
    );
}
