import { useTranslation } from "react-i18next";
import BreadCrumb from "../../layout/breadcrumb";
import GalleryImages from "./images";
import { gallery } from "../../constant";

export default function Gallery() {
    const { t } = useTranslation();

    return (
        <div>
            <BreadCrumb title={t("gallery")} route={[t("home")]} />
            <section className="py-10">
                <div className="container">
                    <GalleryImages images={gallery.slice(0, 7)} className="" />
                    <div className="pb-5" />
                    <GalleryImages images={gallery.slice(7, 14)} className="" />
                </div>
            </section>
        </div>
    );
}
