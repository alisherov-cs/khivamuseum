import { EllipsisVerticalIcon } from "lucide-react";
import DropMenu from "./drop-menu";

export default function DropMore({ children, icon }) {
    return <DropMenu button={ icon || <EllipsisVerticalIcon size={20} />}>

    </DropMenu>
}
