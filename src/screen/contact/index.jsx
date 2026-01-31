import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import Button from "../../components/ui/button";
import FormInput from "../../components/ui/inputs/input";
import BreadCrumb from "../../layout/breadcrumb";

export default function Contact() {
  const { t } = useTranslation();

  const [contact, setContact] = useState({});

  const changeContact = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("contacts", contact)
        .then(() => {
          toast.success(t("sent"));
          setContact({});
        })
        .catch((err) => {
          if (err.response?.data?.err) {
            toast.error(err.response.data.err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadCrumb title={t("contact")} route={[t("home")]} />
      <div className="py-10">
        <div className="container">
          <div className="flex lg:flex-row flex-col gap-y-8 gap-x-6 justify-center">
            <div className="lg:flex-1 w-full rounded-xl">
              <h2 className="heading mb-5">{t("have_questions")}</h2>
              <form className="flex flex-col gap-y-4 p-3 rounded-md">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    required
                    name={"name"}
                    title={t("name")}
                    placeholder={t("enter_first_name")}
                    inputClassName="rounded-md border-gray-400 mt-1 py-[10px]"
                    value={contact}
                    onChange={changeContact}
                  />
                  <FormInput
                    required
                    name={"lastname"}
                    title={t("last_name")}
                    placeholder={t("enter_last_name")}
                    inputClassName="rounded-md border-gray-400 mt-1 py-[10px]"
                    value={contact}
                    onChange={changeContact}
                  />
                  <FormInput
                    required
                    name={"tel"}
                    title={t("phone")}
                    inputClassName="rounded-md border-gray-400 mt-1 py-[10px]"
                    placeholder={"+998 55 604 63 43"}
                    value={contact}
                    onChange={changeContact}
                  />
                  <FormInput
                    required
                    name={"email"}
                    title={t("email")}
                    placeholder={"example@gmail.com"}
                    inputClassName="rounded-md border-gray-400 mt-1 py-[10px]"
                    value={contact}
                    onChange={changeContact}
                  />
                  <FormInput
                    className="col-span-full"
                    type="textarea"
                    required
                    title={t("message")}
                    name={"message"}
                    placeholder={t("your_message")}
                    inputClassName="w-full border border-gray-400 rounded-md p-3 mt-1"
                    value={contact}
                    onChange={changeContact}
                  />
                </div>
                <Button className="self-end mt-2" type="submit">
                  {t("send")}
                </Button>
              </form>
            </div>
            <div className="lg:flex-1 w-full lg:h-auto h-[400px] border border-glow_color rounded-md! overflow-hidden!">
              <iframe
                className="!w-full !h-full !object-cover"
                src="https://yandex.uz/map-widget/v1/?ll=60.358306%2C41.378944&z=20&mode=search&oid=186196413794&theme=dark"
              ></iframe>
            </div>
          </div>
          <div className="mt-12 text-text!">
            <div className="grid min-[500px]:grid-cols-2 gap-10 gap-y-6">
              <div className="">
                <h2 className="text-primary text-xl font-semibold">
                  {t("location")}
                </h2>
                <Link
                  to="https://yandex.uz/maps/org/186196413794/?ll=60.358306%2C41.378944&z=20"
                  className="flex items-center gap-x-2 text-base mt-1"
                >
                  <span>
                    <i className="fa-regular fa-location-dot"></i>
                  </span>
                  <span>{t("address")}</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">
                  {t("phone")}
                </h2>
                <Link
                  to="+998 55 604 63 43"
                  className="flex items-center gap-x-2 text-base mt-1"
                >
                  <span>
                    <i className="fa-regular fa-phone"></i>
                  </span>
                  <span>+998 55 604 63 43</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">
                  {t("email")}
                </h2>
                <Link
                  to="mailto:info@khivamuseum.uz"
                  className="flex items-center gap-x-2 text-base mt-1"
                >
                  <span>
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <span>info@khivamuseum.uz</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">R/S</h2>
                <Link className="flex items-center gap-x-2 text-base mt-1 select-all">
                  <span>400121860334067082200349001</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">MFO</h2>
                <Link className="flex items-center gap-x-2 text-base mt-1 select-all">
                  <span>00014</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">INN</h2>
                <Link className="flex items-center gap-x-2 text-base mt-1 select-all">
                  <span>201126524</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">
                  {t("bank")}
                </h2>
                <Link className="flex items-center gap-x-2 text-base mt-1 select-all">
                  <span>Toshkent shahar Markaziy banki</span>
                </Link>
              </div>
              <div className="">
                {" "}
                <h2 className="text-primary text-xl font-semibold">
                  {t("tel_fax")}
                </h2>
                <Link
                  to="tel:+998 91 857 45 44"
                  className="flex items-center gap-x-2 text-base mt-1"
                >
                  <span>+998 91 857 45 44</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
