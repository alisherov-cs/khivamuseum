import { Trash2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { removeFromCart } from "../../store/user";
import { useDispatch } from "react-redux";

const TicketSingle = ({ data, id }) => {
    const dispatch = useDispatch();
    const {
        t,
        i18n: { language },
    } = useTranslation();

    console.log(data, id);

    const removeTicket = () => {
        dispatch(removeFromCart(data.item.id));
    };

    return (
        <div
            key={data.item.id}
            className="flex justify-between items-center py-3 gap-2 border-b-2 border-gray-300"
        >
            <span className="font-bold text-base">{id + 1}.</span>
            <span className="font-bold first-letter:capitalize text-base flex-1">
                {data.item[language].title}
            </span>
            <span className="text-base font-bold text-primary">×</span>
            <span className="text-base font-bold text-primary">
                {" "}
                {data.quantity}
            </span>
            <div className="cursor-pointer" onClick={removeTicket}>
                <Trash2Icon size={16} className="stroke-red-600" />
            </div>
        </div>
    );
};

export default TicketSingle;
