import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Eye, Share2, ChevronLeft, Heart, MessageCircle, BookOpen, User, CalendarIcon} from 'lucide-react'
import {Link, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import useFetch from '../../hooks/useFetch'
import {format_date} from '../../helper/date_format'
import Button from '../../components/ui/button'
import {Swiper, SwiperSlide} from 'swiper/react'
import './news.css'

// import required modules
import {EffectFade, Navigation, Pagination} from 'swiper/modules'
import BreadCrumb from '../../layout/breadcrumb'

export default function NewsDetails() {
    const {
        t,
        i18n: {language}
    } = useTranslation()

    const {id} = useParams()
    const {data, loading, refresh} = useFetch(`news/${id}`)

    useEffect(() => {
        refresh({path: `news/${id}`})
    }, [id])

    const title = data[language]?.title
    const text = data[language]?.description

    return (
        !loading && (
            <>
                <BreadCrumb title={title} route={[t('home'), t('news')]} />

                <section className='pt-5 lg:pb-[90px] sm:pb-[60px] pb-[40px]'>
                    <div className='container'>
                        <div className=''>
                            <Swiper
                                spaceBetween={30}
                                effect={'fade'}
                                navigation={true}
                                pagination={{
                                    clickable: true
                                }}
                                modules={[EffectFade, Navigation, Pagination]}
                                className='mySwiper'>
                                {data?.images?.map((el, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={el} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='flex items-center mt-5'>
                                <span className='text-base text-gray-600 flex items-center gap-x-2 pr-4 border-r-2 border-gray-600'>
                                    <span>
                                        <i className='fa-regular fa-eye'></i>
                                    </span>
                                    {data.views}
                                </span>
                                <span className='text-base text-gray-600 flex items-center gap-x-2 pl-4'>
                                    <span>
                                        <i className='fa-regular fa-calendar'></i>
                                    </span>
                                    {format_date(data.published_date)}
                                </span>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: text}} className='mt-10'></div>
                        </div>
                    </div>
                </section>
            </>
        )
    )
}
