import { useMemo, useState } from "react";
import SectionTitle from "../../components/parts/section_title";
import Pagination from "../../components/ui/pagination";
import SwitchMulti from "../../components/ui/switch/multi";
import useFetch from "../../hooks/useFetch";
import CardNew from "./new_card";
import { useSearchParams } from "react-router-dom";
import LoaderOverlay from "../../components/loader/overlay";
import IsLoading from "../../components/loader/helper";
import { useTranslation } from "react-i18next";
import BreadCrumb from "../../layout/breadcrumb";

export default function News() {
    const [params] = useSearchParams();
    const { t } = useTranslation();

    const news_loading = IsLoading("news_page_loader");

    const { data, refresh } = useFetch("news", {
        query: `${params.toString()}&limit=15`,
    });

    return (
        <>
            <BreadCrumb title={t("news")} route={[t("home")]} />
            <div className="py-10">
                <div className="container">
                    <LoaderOverlay loading={news_loading}>
                        <div className="grid gap-2 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {data?.items?.map((n) => {
                                return <CardNew data={n} key={n.id} />;
                            })}
                        </div>
                    </LoaderOverlay>
                    <Pagination
                        data={data}
                        refresh={(a) =>
                            refresh({ ...a, loading: "news_page_loader" })
                        }
                    />
                </div>
            </div>
        </>
    );
}
