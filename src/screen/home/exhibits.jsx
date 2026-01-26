import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Exhibits = ({exp}) => {
      const {
          t,
          i18n: {language}
      } = useTranslation()
  return (
    <Link to={`/${language}/collection/${exp.id}`} key={exp.id} className="rounded-2xl overflow-hidden relative w-full h-[375px] shadow-lg">
      <img
        src={exp.images[0]}
        alt={"image"}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end py-5 sm:px-7 px-4">
        <h3 className="text-white mb-2.5 text-lg uppercase">{t(exp[language].title)}</h3>
        <div dangerouslySetInnerHTML={{__html: exp[language].description}} className=" *:text-white text-sm leading-snug line-clamp-2">
          {/* {t(exp[language].description)} */}
        </div>
      </div>
    </Link>
  );
};

export default Exhibits;
