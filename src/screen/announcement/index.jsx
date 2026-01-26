import { useTranslation } from "react-i18next";
import BreadCrumb from "../../layout/breadcrumb";
import { monuments } from "../../constant";
import useFetch from "../../hooks/useFetch";
import CardNew from "./announcement_card";

export default function Collection() {
    const { t } = useTranslation();
    const { data, loading } = useFetch("announcements");

    return (
        !loading && (
            <>
                <BreadCrumb title={t("announcement")} route={[t("home")]} />
                <div className="py-10">
                    <section className="container ">
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                            {!loading &&
                                data.items?.map((exp) => {
                                    console.log(exp);

                                    return <CardNew key={exp.id} exp={exp} />;
                                })}
                        </div>
                    </section>
                </div>
            </>
        )
    );
}
