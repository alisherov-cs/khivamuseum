import { useParams } from 'react-router-dom';
import BreadCrumb from '../../layout/breadcrumb';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import "./collection.css"


const CollectionSingle = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { id } = useParams();
  const { data, loading, refresh } = useFetch(`exhibits/${id}`);

  useEffect(() => {
    refresh({ path: `exhibits/${id}` });
  }, [id]);

  const title = data[language]?.title;
  const text = data[language]?.description;

  return (
    !loading && (
      <>
        <div className="">
          <BreadCrumb
            title={title}
            route={[t('home'), t('news')]}
          />
          <section className="lg:py-[70px] sm:py-[48px] py-[32px]">
            <div className="container">
              <div className="">
                <Swiper
                  spaceBetween={30}
                  effect={'fade'}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectFade, Navigation, Pagination]}
                  className="mySwiperCollection"
                >
                  {data.images?.map((el, i) => (
                    <SwiperSlide
                      className="aspect-[4/3]"
                      key={i}
                    >
                      <img
                        className="w-full "
                        src={el}
                        alt="image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  className="mt-10"
                ></div>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  );
};

export default CollectionSingle;
