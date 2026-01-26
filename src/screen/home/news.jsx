import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import CardNew from "../news/new_card";

export default function HomeNews() {
    const {
        data: { items: news },
        loading,
    } = useFetch("news", { query: "limit=6" });
    const {
        t,
        i18n: { language },
    } = useTranslation();
    return (
        <div className="lg:py-[90px] sm:py-[60px] py-[40px]">
            <section className="container">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="heading !mb-0">{t("news")}</h2>
                    <Link
                        to={`/${language}/news`}
                        className="button bg-transparent border border-dashed transition-all group hover:bg-primary hover:border-solid hover:text-text border-primary text-primary text-xs flex items-center gap-2"
                    >
                        {t("more_details")}
                        <ChevronRightIcon className="size-5 transition-all stroke-primary group-hover:stroke-text" />
                    </Link>
                </div>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                    {!loading &&
                        news?.map((n) => {
                            return <CardNew key={n.id} data={n} />;
                        })}
                </div>
            </section>
        </div>
    );
}
