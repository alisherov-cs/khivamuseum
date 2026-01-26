import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import ElasticRange from "./elastic_range";
import { change_text_size } from "../parts/change_text_size";

const TextSizeController = () => {

    return <ElasticRange
        leftIcon={<ZoomOutIcon className="size-5" />}
        rightIcon={<ZoomInIcon className="size-5" />}
        startingValue={90}
        defaultValue={localStorage.getItem('text-size') || 100}
        maxValue={150}
        isStepped
        stepSize={10}
        onChange={change_text_size}
    />
};

export default TextSizeController;
