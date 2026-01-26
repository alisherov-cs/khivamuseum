import { useEffect, useState } from "react";
import DropDown from "../ui/drop-down";
import { Link, NavLink, useParams } from "react-router-dom";
import i18n, { languages } from "../../i18n";

export default function LangChanger({ ...more }) {
    const { lang } = useParams();
    const [selected, setSelected] = useState(
        languages.find((l) => l.code === lang) || languages[0]
    );

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang.code);
        setSelected(lang);
    };

    useEffect(() => {
        changeLanguage(selected);
    }, []);

    return (
        <DropDown
            dropClickClose
            titleClassName="stroke-white"
            className="cursor-pointer!"
            alignClassName=""
            title={
                <div className="cursor-pointer! flex items-center gap-2">
                    <img
                        className="size-5.5 aspect-square rounded-full"
                        src={selected.flag}
                        alt={selected.code}
                    />
                    {selected.lang}
                </div>
            }
            {...more}
        >
            <div className="cursor-pointer! card w-full p-0 space-y-0.5 !shadow-black/20 overflow-hidden bg-bgcolor">
                {languages.map((lang) => {
                    const newPath = location.pathname.replace(
                        /^\/[^/]+/,
                        `/${lang.code}`
                    );
                    return (
                        <NavLink
                            key={lang.code}
                            to={newPath}
                            onClick={() => {
                                window.location = newPath;
                                changeLanguage(lang);
                            }}
                            className={({ isActive }) =>
                                `py-1 px-3 text-center uppercase group rounded-none glow glow-hover ${
                                    isActive ? "bg-primary" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <div className="flex items-center justify-start gap-2">
                                    <div className="size-5">
                                        <img
                                            className="flex-1 aspect-square rounded-full"
                                            src={lang.flag}
                                            alt={lang.code}
                                        />
                                    </div>
                                    <span
                                        className={`flex-1 text-start ${
                                            isActive ? "text-white" : ""
                                        } text-sm`}
                                    >
                                        {lang.lang}
                                    </span>
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </DropDown>
    );
}
