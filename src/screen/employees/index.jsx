import { useTranslation } from "react-i18next";
import BreadCrumb from "../../layout/breadcrumb";
import { employees } from "../../constant";
import CardEmployee from "./employeesCard";

export default function Employees() {
    const { t } = useTranslation();

    return (
        <>
            <BreadCrumb title={t("employees")} route={[t("home")]} />
            <div className="py-10">
                <div className="container">
                    <div className="grid gap-2 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {employees.map((n) => {
                            return <CardEmployee data={n} key={n.id} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
