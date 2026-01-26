import { useTranslation } from "react-i18next";
import BreadCrumb from "../../layout/breadcrumb";
import { monuments } from "../../constant";
import Exhibits from "../home/exhibits";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router";
import { ChevronRightIcon } from "lucide-react";

export default function Collection() {
    const { t } = useTranslation();
    const { data, loading } = useFetch("exhibits");
    return (
        !loading && (
            <>
                <BreadCrumb
                    title={t("museum_collection")}
                    route={[t("home")]}
                />
                <div className="py-10">
                    {/*
                    <section className="container">
                        <h2 className="heading text-center">
                            {t("exposition_title")}
                        </h2>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                            {!loading &&
                                data.items?.map((exp) => {
                                    return <Exhibits key={exp.id} exp={exp} />;
                                })}
                        </div>
                    </section>
                */}
                    <div className="mb-10">
                        <section className="container  space-y-[60px]">
                            {monuments.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center lg:flex-row lg:h-[350px] flex-col gap-8`}
                                    >
                                        <div className="flex items-center justify-center">
                                            <img
                                                className="lg:h-[350px] aspect-video lg:aspect-square !object-cover rounded-lg"
                                                src={item.image}
                                                alt=""
                                            />
                                        </div>
                                        <div className="lg:flex-1 w-full h-full flex flex-col justify-between py-8">
                                            <div className="flex-1 border-b border-glow_color pb-5 lg:pb-0">
                                                <h2 className="heading text-text text-3xl font-semibold text-center lg:text-start">
                                                    {t(item.title)}
                                                </h2>
                                                <p className="paragraph desc text-shadow-text!">
                                                    {t(item.desc)}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-start gap-5 mt-10 self-center lg:self-start">
                                                <Link className="button bg-transparent border border-dashed transition-all group hover:bg-primary hover:border-solid hover:text-text border-primary text-primary text-xs flex items-center gap-2">
                                                    {t("more_details")}
                                                    <ChevronRightIcon className="size-4 stroke-primary transition-all group-hover:stroke-text" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </div>
                </div>
            </>
        )
    );
}
