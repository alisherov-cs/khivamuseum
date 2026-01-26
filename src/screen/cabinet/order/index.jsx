import { useTranslation } from "react-i18next";
import useFetch from "../../../hooks/useFetch";

import { loaders_keys } from "../../../constant";
import OrderItem from "./order_item";
import ModalAsk from "../../../components/modal/ask";
import { useState } from "react";

export default function CabinetOrder() {
    const { t } = useTranslation();

    const [modal, setModal] = useState({
        open: false,
        order: null,
        next: () => {},
    });

    const {
        data: { items: orders },
        setData,
        loading,
    } = useFetch("orders/me", {
        loader: loaders_keys.cabinet,
        query: "status=active",
    });

    return (
        !loading && (
            <>
                <ModalAsk
                    open={modal.open}
                    close={() => setModal({})}
                    next={modal.next}
                >
                    {modal.order && (
                        <div>
                            {t("you_really_want_to_cancel")} #{modal.order.id}{" "}
                            {t("order_?")}
                        </div>
                    )}
                </ModalAsk>
                <div className="w-full">
                    <h1 className="text-xl font-semibold text-text mb-4">
                        {t("ticket_list")}
                    </h1>
                    <div className="flex flex-col gap-y-3 mt-5">
                        {orders?.map((order = {}, index) => (
                            <OrderItem
                                key={order.id}
                                order={order}
                                setData={setData}
                                i={index}
                                setModal={setModal}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    );
}
