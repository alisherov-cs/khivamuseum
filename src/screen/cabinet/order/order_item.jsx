import { motion as m } from "framer-motion";
import {
  CalendarIcon,
  ChevronDownIcon,
  FileDownIcon,
  TicketIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import API from "../../../api";
import Button from "../../../components/ui/button";
import Timer from "../../../components/ui/timer";
import { ORDER_STATUSES } from "../../../constant";
import { format_date } from "../../../helper/date_format";
import { priceFormat } from "../../../helper/price_format";

const OrderItem = ({ order, setData, i, setModal }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  function createPaymeLink({ id, price }) {
    const params = `m=68481c1670e3dcbc596ca07b;ac.order_id=${id};a=${price * 100}`;
    const base64 = btoa(params);
    return `https://checkout.paycom.uz/${base64}`;
  }

  const { start, end } = useMemo(() => {
    const start = new Date(order.createdAt).getTime();
    const end = new Date(order.cancel_time).getTime();
    return { start, end };
  }, [order.createdAt]);

  const downloadPdf = useCallback(async (orderId) => {
    try {
      const response = await API.get(`orders/${orderId}/invitation`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Chipta-№${orderId}.pdf`; // Fayl nomi
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url); // Xotirani tozalash
    } catch (error) {
      console.error("Yuklab olishda xatolik:", error);
    }
  }, []);

  const changeOrderStatus = useCallback(
    (id, status) => {
      setData((prev) => {
        const updatedOrders = prev.items.map((order) => {
          if (order.id === id) {
            return { ...order, status };
          }
          return order;
        });
        return { ...prev, items: updatedOrders };
      });
    },
    [order.createdAt],
  );

  const cancelOrder = useCallback(async (order_id) => {
    try {
      await API.post(`orders/${order_id}/cancel`, {
        status: ORDER_STATUSES.canceled.key,
      })
        .then((res) => {
          if (res.status === 200) {
            changeOrderStatus(order_id, ORDER_STATUSES.canceled.key);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isCanceledOrder = useMemo(() => {
    return [
      ORDER_STATUSES.canceled.key,
      ORDER_STATUSES.expired.key,
      ORDER_STATUSES.visited.key,
    ].includes(order.status);
  }, [order]);

  const location = useLocation();

  return (
    <m.div
      key={order.id}
      className={`card rounded-xl relative overflow-hidden sm:p-6 bg-bgcolor p-4 border border-text/10`}
    >
      {isCanceledOrder && (
        <div className="backdrop-grayscale absolute inset-0 z-10 pointer-events-none" />
      )}
      <div className="flex justify-between items-start relative">
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xl font-bold">#{order.id}</p>
              {/* <p className='text-sm text-[#022133]/60'>PIN: {order.pin}</p> */}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium z-20`}
              style={{
                backgroundColor: `${ORDER_STATUSES[order.status].color}22`,
                color: ORDER_STATUSES[order.status].color,
              }}
            >
              {ORDER_STATUSES[order.status].title}
            </div>
            {!isCanceledOrder && order.status !== ORDER_STATUSES.paid.key && (
              <Timer
                start={start}
                end={end}
                onFinish={() =>
                  changeOrderStatus(order.id, ORDER_STATUSES.expired.key)
                }
              />
            )}
          </div>
          <div className="text-text/70">
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{format_date(order.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold text-primary">
            {priceFormat(order.total_price)}
          </p>
          <button
            onClick={handleDropdown}
            className="mt-2 flex items-center text-primary cursor-pointer text-sm"
          >
            {t("more_details")}
            <ChevronDownIcon
              className={`size-4 stroke-primary duration-300 ${dropdown ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-500 ${
          dropdown
            ? "max-h-[1000px] opacity-100 pointer-events-auto mt-6"
            : "max-h-0 opacity-0 pointer-events-none  mt-0"
        }`}
      >
        <div className="flex flex-col">
          {order.items.map((el) => {
            const { [language]: ticket_translation = {} } = el.ticket || {};
            return (
              <div
                className="border-t border-border/10 py-4 flex items-center gap-x-3 justify-between"
                key={el.id}
              >
                <h3 className="text-sm font-semibold">
                  {window.screen.width < 1024
                    ? ticket_translation.title.length > 36
                      ? `${ticket_translation.title.slice(0, 36)}...`
                      : ticket_translation.title
                    : ticket_translation.title}
                </h3>
                <div className="text-primary text-lg font-bold flex items-center leading-none gap-x-1">
                  {" "}
                  {el.quantity}{" "}
                  <span>
                    <TicketIcon size={20} className="stroke-primary" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {order.status === ORDER_STATUSES.paid.key && (
        <div className={`flex items-center justify-end  pt-5`}>
          <Button click={() => downloadPdf(order.id)} className="">
            <div className="flex items-center gap-x-2 font-semibold text-inherit">
              <FileDownIcon className="size-5 stroke-white" />
              {t("download")}
            </div>
          </Button>
        </div>
      )}
      {!isCanceledOrder && order.status !== ORDER_STATUSES.paid.key && (
        <div className="mt-10 flex items-end gap-x-3 gap-y-2 sm:flex-row flex-col-reverse">
          <Button
            click={() =>
              setModal({
                open: true,
                order,
                next: () => cancelOrder(order.id),
              })
            }
            className="button bg-red-500"
          >
            {t("cancel")}
          </Button>
          <div className="flex items-center justify-end sm:gap-x-4 gap-x-2 flex-1 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto"
              target="_blank"
              href={`https://my.click.uz/services/pay?amount=${
                order.total_price
              }&merchant_id=17427&merchant_user_id=43386&service_id=25098&transaction_param=${
                order.id
              }&return_url=${window.location.origin + location.pathname}`}
            >
              <button
                style={{ backgroundImage: 'url("/images/click-logo.png")' }}
                className="py-6 sm:px-16 w-full sm:w-auto 
               duration-300 active:scale-95 cursor-pointer rounded-xl bg-no-repeat bg-cover bg-center relative"
              >
                <div class="absolute top-0 h-[150%] w-5 bg-white/70 blur-lg button-effect rotate-45 "></div>
              </button>
            </a>
            <a
              className="w-full sm:w-auto"
              target="_blank"
              href={createPaymeLink({
                id: order.id,
                price: order.total_price,
              })}
            >
              <button
                style={{ backgroundImage: 'url("/images/payme-logo.png")' }}
                className="py-6 sm:px-16 w-full sm:w-auto 
               duration-300 active:scale-95 cursor-pointer rounded-xl bg-no-repeat bg-contain border border-primary bg-center relative"
              >
                {/* <div class="absolute top-0 h-[150%] w-5 bg-white/70 blur-lg button-effect rotate-45"></div> */}
              </button>
            </a>
          </div>
        </div>
      )}
    </m.div>
  );
};

export default OrderItem;
